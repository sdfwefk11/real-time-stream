"use client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { Crown, MinusCircle } from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { onBlock } from "@/actions/block";
import { useTransition } from "react";
import { toast } from "sonner";

interface ChatMessageProps {
  data: ReceivedChatMessage;
  hostName: string;
  viewerName: string;
}

export function ChatMessage({ data, hostName, viewerName }: ChatMessageProps) {
  const [isPending, startTransition] = useTransition();
  const isHostParticipant = hostName === data.from?.name;
  const isHost = viewerName === hostName;
  const isSelf = hostName === data.from?.name;
  const color = stringToColor(data.from?.name || "");

  const handleBlock = () => {
    if (!data || isSelf || !isHost) return;
    startTransition(() => {
      if (!data.from?.identity) return;
      onBlock(data.from.identity)
        .then(() => toast.success(`Blocked ${data.from?.name}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5 group">
      <p className="text-sm text-white/40">
        {format(data.timestamp, "HH:mm", { locale: ko })}
      </p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        {isHostParticipant && <Crown className="w-4 h-4 text-yellow-500" />}
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
      {isHost && !isSelf && (
        <Hint label="차단">
          <Button
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            variant="ghost"
          >
            <MinusCircle className="w-4 h-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
}
