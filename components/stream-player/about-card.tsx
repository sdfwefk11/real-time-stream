import { BioModal } from "./bio-modal";
import { VerifiedMark } from "./verified-mark";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  followedByCount: number;
  bio: string | null;
}

export function AboutCard({
  hostIdentity,
  hostName,
  viewerIdentity,
  followedByCount,
  bio,
}: AboutCardProps) {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            {hostName} 님의 정보
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-sm">
            구독자 {followedByCount}명
          </span>
        </div>
        <p className="text-sm">{bio || "아직 작성된 소개글이 없습니다."}</p>
      </div>
    </div>
  );
}
