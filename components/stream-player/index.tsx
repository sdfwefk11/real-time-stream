"use client";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream_stream, Stream_user } from "prisma/prisma-client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
import { useToggleThumbnail } from "@/store/use-thumbnail-toggle";
import Image from "next/image";
import { AlertTriangle, Minimize2 } from "lucide-react";
import { Button } from "../ui/button";

interface StreamPlayerProps {
  host: Stream_user & { stream: Stream_stream | null };
  stream: Stream_stream;
  isFollowing: boolean;
}

export function StreamPlayer({ host, stream, isFollowing }: StreamPlayerProps) {
  const { identity, token, name } = useViewerToken(host.id);
  const { collapsed } = useChatSidebar((state) => state);
  const { isThumbnailToggle, onToggle } = useToggleThumbnail((state) => state);

  if (!token || !identity || !name) {
    return <StreamPlayerSkeleton />;
  }
  return (
    <>
      <div
        onClick={() => onToggle()}
        className={cn(
          "fixed w-full h-full items-center justify-center left-0 top-0 right-0 bottom-0 bg-black opacity-0 transition-all flex pointer-events-none z-50",
          isThumbnailToggle && "bg-opacity-40 opacity-100 pointer-events-auto"
        )}
      >
        {stream.thumbnailUrl ? (
          <div
            className={cn(
              "absolute aspect-video group transition-all duration-300 w-0 ",
              isThumbnailToggle &&
                "w-[440px] h-[300px] md:w-[650px] lg:w-[900px] xl:w-[1100px] md:h-[500px] lg:h-[550px] xl:h-[600px] md:ml-14 lg:ml-0"
            )}
          >
            <Button
              className="absolute z-50 right-1 top-1 text-muted-foreground group-hover:bg-background"
              size="icon"
              variant="ghost"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Image
              fill
              src={stream.thumbnailUrl}
              alt={stream.thumbnailUrl}
              className="rounded-md object-cover border border-[#2D2E35]"
            />
          </div>
        ) : (
          <div className="absolute w-[440px] h-[300px] aspect-video  md:w-[650px] lg:w-[900px] xl:w-[1100px] md:h-[500px] lg:h-[550px] xl:h-[600px] md:ml-14 lg:ml-0 group transition-all ">
            <Button
              className="absolute z-50 right-1 top-1 text-muted-foreground group-hover:bg-background"
              size="icon"
              variant="ghost"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <div className="bg-background shadow w-full h-full flex items-center justify-center flex-col gap-y-3 rounded-md border border-[#2D2E35] text-muted-foreground">
              <AlertTriangle className="w-10 h-10" />
              <p className="d font-semibold">등록된 이미지가 없습니다.</p>
            </div>
          </div>
        )}
      </div>

      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={host.username} hostIdentity={host.id} />
          <Header
            hostName={host.username}
            hostIdentity={host.id}
            viewerIdentity={identity}
            imageUrl={host.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={host.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
        </div>
        <div
          className={cn("col-span-1 transition-all ", collapsed && "hidden")}
        >
          <Chat
            viewerName={name}
            hostName={host.username}
            hostIdentity={host.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

export function StreamPlayerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
}
