import { CircleCheck } from "lucide-react";
import { act, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  id: string;
  title: string;
  occurs_at: string;
}

export function Activities() {
  const { tripid } = useParams();
  const [activity, setActivity] = useState<Activity[]>([]);
  useEffect(() => {
    api
      .get(`/trips/${tripid}/activities`)
      .then((response) => setActivity(response.data));
  }, [tripid]);

  console.log(activity);

  return (
    <div className="space-y-8">
      {activity.map((act) => (
        <div key={act.id} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300">
              {act ? format(act.occurs_at, "' Dia 'd") : null}
            </span>
            <span className="text-xs text-zinc-500">
              {format(act.occurs_at, "EEEE", { locale: ptBR })}
            </span>
          </div>
          {activity.length > 0 ? (
            <div className="space-y-2.5">
              <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center justify-between gap-3">
                <CircleCheck className="size-5 text-lime-300" />
                <span className="text-zinc-100">{act.title}</span>
                <span className="text-zinc-400 text-sm ml-auto">
                  {format(act.occurs_at, "HH:mm")}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">
              Nenhuma atividade cadastrada nessa data.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
