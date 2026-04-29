import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Sparkles, Medal } from "lucide-react";

export default function Leaderboard() {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => { api("/leaderboard").then(setList as any); }, []);

  return (
    <Layout>
      <div className="container py-10 max-w-3xl">
        <div className="text-center mb-8">
          <Trophy className="h-12 w-12 mx-auto text-secondary mb-2" />
          <h1 className="font-display text-4xl font-bold">Honesty Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Warga kampus paling amanah bulan ini.</p>
        </div>
        <div className="space-y-3">
          {list.map((u, i) => (
            <Card key={u.id} className={`p-5 flex items-center gap-4 ${i<3?"border-secondary/40 shadow-card":""}`}>
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-display font-bold text-lg ${i===0?"gradient-amber text-secondary-foreground":i<3?"bg-secondary/15 text-secondary-foreground":"bg-muted text-muted-foreground"}`}>
                {i < 3 ? <Medal className="h-5 w-5" /> : i+1}
              </div>
              <Avatar className="h-12 w-12 border-2 border-secondary">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {u.full_name.split(" ").map((s:string)=>s[0]).slice(0,2).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{u.full_name}</div>
                <div className="text-xs text-muted-foreground">{u.faculty || "—"}</div>
              </div>
              <div className="inline-flex items-center gap-1 font-display font-bold text-lg text-secondary">
                <Sparkles className="h-4 w-4" /> {u.honesty_points}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
