import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes.js";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true, service: "ketemu-api" }));
app.use("/api", routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ KETEMU API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
});
