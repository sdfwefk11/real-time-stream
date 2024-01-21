"use client";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream_stream, Stream_user } from "prisma/prisma-client";

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
  return <div>Allowed to watch the stream</div>;
}
