import { CheckCircle, CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  isConfirmed: boolean;
}

export function Guests() {
  const { tripid } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripid}/participants`)
      .then((response) => setParticipants(response.data));
  }, [tripid]);

  return (
    <div>
      <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>
        {participants.map((participant, index) => (
          <div key={participant.id} className="space-y-5">
            <div className="flex items-center justify-between gap-4 ">
              <div className="space-y-1.5 flex-1">
                <span className="block font-medium text-zinc-100">
                  {participant.name == ""
                    ? `Convidado ${index}`
                    : participant.name}
                </span>
                <span className="block text-xs text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.isConfirmed ? (
                <CheckCircle2 className="size-5 text-green-400" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400" />
              )}
            </div>
          </div>
        ))}
        <Button variant="secondary" size="full">
          <UserCog className="size-5" />
          Gerenciar convidados
        </Button>
      </div>
    </div>
  );
}
