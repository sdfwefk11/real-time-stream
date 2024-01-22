"use client";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream_stream, Stream_user } from "prisma/prisma-client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video } from "./video";

interface StreamPlayerProps {
  user: Stream_user & { stream: Stream_stream | null };
  stream: Stream_stream;
  isFollowing: boolean;
}

export function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
  const { identity, token, name } = useViewerToken(user.id);

  if (!token || !identity || !name) {
    return <div>Cannot watch the stream</div>;
  }
  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  );
}
