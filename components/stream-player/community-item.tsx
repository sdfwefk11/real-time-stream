"use client";

import { cn, stringToColor } from "@/lib/utils";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { CrownIcon, MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { onBlock } from "@/actions/block";
import { toast } from "sonner";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export function CommunityItem({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;
  const isHostParticipant = participantIdentity.includes("host");

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;
    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`${participantName} 차단되었습니다`))
        .catch(() => toast.error("서버응답 오류"));
    });
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p
        style={{ color: color }}
        className="flex gap-x-1 justify-center items-center"
      >
        {isHostParticipant && <CrownIcon className="w-4 h-4 text-yellow-500" />}
        {participantName}
      </p>
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
