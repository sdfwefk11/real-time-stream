"use client";
import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

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
  const debouncedValue = useDebounce<string>(value, 500);
  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };
  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      //내가 방송을켰을때 participants[]에는 현재 방송중인 나와 나를 시청하는 나 2개의 값이 들어온다 따라서 현재 방송중인 나의 항목을 제거하기위해 reduce사용
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block">
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
