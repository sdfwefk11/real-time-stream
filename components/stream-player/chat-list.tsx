"use client";
import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "../ui/skeleton";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
  hostName: string;
  viewerName: string;
}

export function ChatList({
  messages,
  isHidden,
  hostName,
  viewerName,
}: ChatListProps) {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden
            ? "채팅이 비활성화 되었습니다"
            : "채팅에 오신걸 환영합니다!"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage
          key={message.timestamp}
          data={message}
          hostName={hostName}
          viewerName={viewerName}
        />
      ))}
    </div>
  );
}

export function ChatListSkeleton() {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
}
