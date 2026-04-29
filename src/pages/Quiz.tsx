import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Sparkles, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { toast } from "sonner";

type Quiz = {
  id: string; title: string; description: string; points_reward: number;
  questions: { id: string; question: string; option_a: string; option_b: string; option_c: string; option_d: string }[];
};

export default function Quiz() {
  const { user, refresh } = useAuth();
  const nav = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api<Quiz[]>("/quizzes").then(qs => {
      if (qs[0]) api<Quiz>(`/quizzes/${qs[0].id}`).then(setQuiz);
    });
  }, []);

  const submit = async () => {
    if (!user) return nav("/login");
    if (!quiz) return;
    if (Object.keys(answers).length < quiz.questions.length)
      return toast.error("Jawab semua pertanyaan dulu ya.");
    setSubmitting(true);
    try {
      const r = await api(`/quizzes/${quiz.id}/submit`, { method: "POST", body: JSON.stringify({ answers }) });
      setResult(r);
      await refresh();
    } catch (e: any) { toast.error(e.message); }
    finally { setSubmitting(false); }
  };

  if (!quiz) return <Layout><div className="container py-20 text-center text-muted-foreground">Memuat...</div></Layout>;

  if (result) {
    const { attempt, detail } = result;
    return (
      <Layout>
        <div className="container py-10 max-w-3xl">
          <Card className={`p-10 text-center mb-6 ${attempt.passed ? "gradient-hero text-primary-foreground" : "bg-muted"}`}>
            <Trophy className={`h-16 w-16 mx-auto mb-3 ${attempt.passed?"text-secondary":"text-muted-foreground"}`} />
            <h1 className="font-display text-4xl font-bold mb-2">
              {attempt.passed ? "Selamat! Kamu lulus" : "Belum lulus, coba lagi yuk"}
            </h1>
            <p className="text-xl mb-4">Skor: <span className="font-bold">{attempt.score}/{attempt.total_questions}</span></p>
            {attempt.passed && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-bold">
                <Sparkles className="h-5 w-5" /> +{attempt.points_earned} Honesty Points
              </div>
            )}
          </Card>
          <div className="space-y-3">
            {detail.map((d: any, i: number) => {
              const q = quiz.questions[i];
              return (
                <Card key={d.question_id} className="p-5">
                  <div className="flex items-start gap-3">
                    {d.is_correct ? <CheckCircle2 className="h-5 w-5 text-success mt-1"/> : <XCircle className="h-5 w-5 text-destructive mt-1"/>}
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{q.question}</div>
                      <div className="text-sm text-muted-foreground">Jawaban kamu: <span className="font-semibold">{d.given || "-"}</span> · Benar: <span className="font-semibold text-success">{d.correct}</span></div>
                      {d.explanation && <p className="text-sm mt-2 text-foreground/80 italic">💡 {d.explanation}</p>}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="hero" onClick={() => nav("/items")}>Jelajahi Laporan</Button>
            <Button variant="outline" onClick={() => { setResult(null); setAnswers({}); }}>Ulangi Kuis</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 rounded-2xl gradient-amber items-center justify-center mb-3">
            <Brain className="h-8 w-8 text-secondary-foreground" />
          </div>
          <h1 className="font-display text-4xl font-bold">{quiz.title}</h1>
          <p className="text-muted-foreground mt-2">{quiz.description}</p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-secondary"/> Hadiah: {quiz.points_reward} Honesty Points
          </div>
        </div>
        <div className="space-y-5">
          {quiz.questions.map((q, idx) => (
            <Card key={q.id} className="p-6">
              <div className="font-display font-bold text-lg mb-3">{idx + 1}. {q.question}</div>
              <RadioGroup value={answers[q.id]} onValueChange={v => setAnswers(s => ({ ...s, [q.id]: v }))}>
                {(["A","B","C","D"] as const).map(letter => {
                  const text = (q as any)[`option_${letter.toLowerCase()}`];
                  const sel = answers[q.id] === letter;
                  return (
                    <Label key={letter} className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-smooth ${sel?"border-primary bg-primary/5":"border-border hover:border-primary/30"}`}>
                      <RadioGroupItem value={letter} className="mt-0.5" />
                      <span><span className="font-semibold mr-1">{letter}.</span>{text}</span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </Card>
          ))}
        </div>
        <Button variant="hero" size="lg" className="w-full mt-6" onClick={submit} disabled={submitting}>
          {submitting ? "Mengirim..." : "Kumpulkan Jawaban"}
        </Button>
      </div>
    </Layout>
  );
}
