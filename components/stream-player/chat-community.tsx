"use client";
import { useParticipants } from "@livekit/components-react";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";

interface ChatCommunityProps {
  hostName: string;
  isHidden: boolean;
  viewerName: string;
}

export function ChatCommunity({
  hostName,
  isHidden,
  viewerName,
}: ChatCommunityProps) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  const participants = useParticipants();

  return (
    <div>
      {participants.map((participant) => (
        <div key={Math.random()}>{JSON.stringify(participant)}</div>
      ))}
    </div>
  );
}
