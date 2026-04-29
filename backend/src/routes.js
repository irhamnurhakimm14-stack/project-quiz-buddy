import express from "express";
import bcrypt from "bcryptjs";
import { query } from "./db.js";
import { signToken, authRequired, adminRequired } from "./auth.js";

const router = express.Router();

// ============== AUTH ==============
router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, full_name, nim, phone, role, faculty } = req.body;
    if (!email || !password || !full_name)
      return res.status(400).json({ error: "email, password, full_name required" });
    const exists = await query("SELECT 1 FROM users WHERE email=$1", [email]);
    if (exists.rowCount) return res.status(409).json({ error: "Email already used" });
    const hash = await bcrypt.hash(password, 10);
    const r = await query(
      `INSERT INTO users(email,password_hash,full_name,nim,phone,role,faculty,is_verified)
       VALUES($1,$2,$3,$4,$5,$6,$7,TRUE)
       RETURNING id,email,full_name,role,honesty_points`,
      [email, hash, full_name, nim || null, phone || null, role || "student", faculty || null]
    );
    const user = r.rows[0];
    const token = signToken({ id: user.id, role: user.role, email: user.email });
    res.json({ user, token });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message }); }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const r = await query("SELECT * FROM users WHERE email=$1", [email]);
    if (!r.rowCount) return res.status(401).json({ error: "Invalid credentials" });
    const u = r.rows[0];
    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = signToken({ id: u.id, role: u.role, email: u.email });
    delete u.password_hash;
    res.json({ user: u, token });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message }); }
});

router.get("/auth/me", authRequired, async (req, res) => {
  const r = await query(
    "SELECT id,email,full_name,nim,phone,role,faculty,avatar_url,honesty_points,is_verified FROM users WHERE id=$1",
    [req.user.id]
  );
  res.json(r.rows[0] || null);
});

// ============== ITEMS ==============
router.get("/items", async (req, res) => {
  const { type, category, status = "approved", q } = req.query;
  const conds = ["i.status = $1"];
  const params = [status];
  if (type) { params.push(type); conds.push(`i.type = $${params.length}`); }
  if (category) { params.push(category); conds.push(`i.category = $${params.length}`); }
  if (q) { params.push(`%${q}%`); conds.push(`(i.title ILIKE $${params.length} OR i.description ILIKE $${params.length})`); }
  const sql = `
    SELECT i.*, u.full_name AS reporter_name, u.honesty_points AS reporter_points,
           l.name AS location_name
    FROM items i
    JOIN users u ON u.id = i.user_id
    LEFT JOIN locations l ON l.id = i.location_id
    WHERE ${conds.join(" AND ")}
    ORDER BY i.is_priority DESC, i.created_at DESC
    LIMIT 100`;
  const r = await query(sql, params);
  res.json(r.rows);
});

router.get("/items/:id", async (req, res) => {
  await query("UPDATE items SET views = views + 1 WHERE id=$1", [req.params.id]);
  const r = await query(
    `SELECT i.*, u.full_name AS reporter_name, u.honesty_points AS reporter_points, u.phone AS reporter_phone,
            l.name AS location_name
     FROM items i JOIN users u ON u.id=i.user_id
     LEFT JOIN locations l ON l.id=i.location_id
     WHERE i.id=$1`, [req.params.id]);
  if (!r.rowCount) return res.status(404).json({ error: "Not found" });
  res.json(r.rows[0]);
});

router.post("/items", authRequired, async (req, res) => {
  try {
    const { type, title, description, category, image_url, location_id, location_text, date_event } = req.body;
    const r = await query(
      `INSERT INTO items(user_id,type,title,description,category,image_url,location_id,location_text,date_event,status)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,'approved') RETURNING *`,
      [req.user.id, type, title, description, category, image_url || null, location_id || null, location_text || null, date_event]
    );
    // bonus poin untuk found item
    if (type === "found") {
      await query(
        `INSERT INTO honesty_logs(user_id,points,reason,reference_type,reference_id) VALUES($1,25,'Melaporkan barang temuan','item',$2)`,
        [req.user.id, r.rows[0].id]
      );
      await query(`UPDATE users SET honesty_points = honesty_points + 25 WHERE id=$1`, [req.user.id]);
    }
    res.json(r.rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: e.message }); }
});

router.patch("/items/:id/resolve", authRequired, async (req, res) => {
  const r = await query(
    `UPDATE items SET status='resolved' WHERE id=$1 AND user_id=$2 RETURNING *`,
    [req.params.id, req.user.id]
  );
  if (!r.rowCount) return res.status(404).json({ error: "Not found / forbidden" });
  res.json(r.rows[0]);
});

// ============== CLAIMS ==============
router.post("/items/:id/claims", authRequired, async (req, res) => {
  try {
    const { proof_text, proof_image_url } = req.body;
    const r = await query(
      `INSERT INTO claims(item_id,claimant_id,proof_text,proof_image_url) VALUES($1,$2,$3,$4) RETURNING *`,
      [req.params.id, req.user.id, proof_text, proof_image_url || null]
    );
    res.json(r.rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get("/claims/mine", authRequired, async (req, res) => {
  const r = await query(
    `SELECT c.*, i.title AS item_title, i.type AS item_type
     FROM claims c JOIN items i ON i.id=c.item_id
     WHERE c.claimant_id=$1 ORDER BY c.created_at DESC`, [req.user.id]
  );
  res.json(r.rows);
});

router.get("/claims/incoming", authRequired, async (req, res) => {
  const r = await query(
    `SELECT c.*, i.title AS item_title, u.full_name AS claimant_name, u.honesty_points AS claimant_points
     FROM claims c JOIN items i ON i.id=c.item_id JOIN users u ON u.id=c.claimant_id
     WHERE i.user_id=$1 ORDER BY c.created_at DESC`, [req.user.id]);
  res.json(r.rows);
});

router.patch("/claims/:id", authRequired, async (req, res) => {
  const { status, admin_note } = req.body; // approved / rejected
  const c = await query(`SELECT c.*, i.user_id AS owner_id FROM claims c JOIN items i ON i.id=c.item_id WHERE c.id=$1`, [req.params.id]);
  if (!c.rowCount) return res.status(404).json({ error: "Not found" });
  if (c.rows[0].owner_id !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });
  const r = await query(
    `UPDATE claims SET status=$1, admin_note=$2, reviewed_at=NOW() WHERE id=$3 RETURNING *`,
    [status, admin_note || null, req.params.id]
  );
  if (status === "approved") {
    await query(`UPDATE items SET status='resolved' WHERE id=$1`, [c.rows[0].item_id]);
    await query(`INSERT INTO honesty_logs(user_id,points,reason,reference_type,reference_id) VALUES($1,50,'Klaim valid - barang kembali','claim',$2)`, [c.rows[0].claimant_id, c.rows[0].id]);
    await query(`UPDATE users SET honesty_points = honesty_points + 50 WHERE id=$1`, [c.rows[0].claimant_id]);
  }
  res.json(r.rows[0]);
});

// ============== HONESTY LOGS / LEADERBOARD ==============
router.get("/honesty/me", authRequired, async (req, res) => {
  const r = await query(`SELECT * FROM honesty_logs WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50`, [req.user.id]);
  res.json(r.rows);
});

router.get("/leaderboard", async (req, res) => {
  const r = await query(
    `SELECT id, full_name, faculty, honesty_points, avatar_url
     FROM users WHERE role <> 'admin' ORDER BY honesty_points DESC LIMIT 10`
  );
  res.json(r.rows);
});

// ============== QUIZ ==============
router.get("/quizzes", async (req, res) => {
  const r = await query(`SELECT id,title,description,points_reward FROM quizzes WHERE is_active=TRUE`);
  res.json(r.rows);
});

router.get("/quizzes/:id", async (req, res) => {
  const q = await query(`SELECT * FROM quizzes WHERE id=$1`, [req.params.id]);
  if (!q.rowCount) return res.status(404).json({ error: "Not found" });
  const qs = await query(
    `SELECT id,question,option_a,option_b,option_c,option_d,display_order
     FROM quiz_questions WHERE quiz_id=$1 ORDER BY display_order`, [req.params.id]
  );
  res.json({ ...q.rows[0], questions: qs.rows });
});

router.post("/quizzes/:id/submit", authRequired, async (req, res) => {
  try {
    const { answers } = req.body; // {questionId: 'A'|'B'|'C'|'D'}
    const qs = await query(`SELECT id,correct_answer,explanation FROM quiz_questions WHERE quiz_id=$1`, [req.params.id]);
    let score = 0;
    const detail = qs.rows.map(q => {
      const given = answers?.[q.id];
      const correct = given === q.correct_answer;
      if (correct) score++;
      return { question_id: q.id, given, correct: q.correct_answer, is_correct: correct, explanation: q.explanation };
    });
    const total = qs.rows.length;
    const passed = score / total >= 0.6;
    const quizRow = await query(`SELECT points_reward FROM quizzes WHERE id=$1`, [req.params.id]);
    const points = passed ? quizRow.rows[0].points_reward : 0;
    const a = await query(
      `INSERT INTO quiz_attempts(user_id,quiz_id,score,total_questions,passed,points_earned,answers)
       VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [req.user.id, req.params.id, score, total, passed, points, JSON.stringify(answers || {})]
    );
    if (passed) {
      await query(`UPDATE users SET honesty_points = honesty_points + $1 WHERE id=$2`, [points, req.user.id]);
      await query(`INSERT INTO honesty_logs(user_id,points,reason,reference_type,reference_id) VALUES($1,$2,'Lulus Kuis Integritas','quiz',$3)`, [req.user.id, points, a.rows[0].id]);
    }
    res.json({ attempt: a.rows[0], detail });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message }); }
});

// ============== LOCATIONS ==============
router.get("/locations", async (_req, res) => {
  const r = await query(`SELECT * FROM locations ORDER BY name`);
  res.json(r.rows);
});

// ============== PRIORITY BROADCAST ==============
router.post("/items/:id/priority", authRequired, async (req, res) => {
  const item = await query(`SELECT * FROM items WHERE id=$1 AND user_id=$2`, [req.params.id, req.user.id]);
  if (!item.rowCount) return res.status(404).json({ error: "Not found" });
  const tx = await query(
    `INSERT INTO priority_transactions(user_id,item_id) VALUES($1,$2) RETURNING *`,
    [req.user.id, req.params.id]
  );
  await query(
    `UPDATE items SET is_priority=TRUE, priority_until=NOW()+INTERVAL '72 hours' WHERE id=$1`,
    [req.params.id]
  );
  res.json(tx.rows[0]);
});

// ============== NOTIFICATIONS ==============
router.get("/notifications", authRequired, async (req, res) => {
  const r = await query(`SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 30`, [req.user.id]);
  res.json(r.rows);
});

router.patch("/notifications/:id/read", authRequired, async (req, res) => {
  await query(`UPDATE notifications SET is_read=TRUE WHERE id=$1 AND user_id=$2`, [req.params.id, req.user.id]);
  res.json({ ok: true });
});

// ============== ADMIN ==============
router.get("/admin/items", authRequired, adminRequired, async (_req, res) => {
  const r = await query(
    `SELECT i.*, u.full_name AS reporter_name FROM items i JOIN users u ON u.id=i.user_id ORDER BY i.created_at DESC`
  );
  res.json(r.rows);
});

router.patch("/admin/items/:id", authRequired, adminRequired, async (req, res) => {
  const { status } = req.body;
  const r = await query(`UPDATE items SET status=$1 WHERE id=$2 RETURNING *`, [status, req.params.id]);
  res.json(r.rows[0]);
});

router.get("/admin/stats", authRequired, adminRequired, async (_req, res) => {
  const r = await query(`
    SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM items) AS total_items,
      (SELECT COUNT(*) FROM items WHERE type='lost') AS total_lost,
      (SELECT COUNT(*) FROM items WHERE type='found') AS total_found,
      (SELECT COUNT(*) FROM items WHERE status='resolved') AS total_resolved,
      (SELECT COUNT(*) FROM claims) AS total_claims,
      (SELECT COALESCE(SUM(amount),0) FROM priority_transactions) AS revenue_priority
  `);
  res.json(r.rows[0]);
});

export default router;
