"use client";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserAvatar } from "../user-avatar";
import { VerifiedMark } from "./verified-mark";

interface HeaderProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
}

export function Header({
  hostIdentity,
  hostName,
  viewerIdentity,
  isFollowing,
  imageUrl,
  name,
}: HeaderProps) {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={true}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
        </div>
      </div>
    </div>
  );
}
