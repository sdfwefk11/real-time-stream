import { VerifiedMark } from "@/components/stream-player/verified-mark";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { Stream_stream, Stream_user } from "prisma/prisma-client";

interface ResultCardProps {
  data: Stream_stream & { user: Stream_user };
}

export function ResultCard({ data }: ResultCardProps) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            username={data.user.username}
            isLive={data.isLive}
            fallback={data.user.imageUrl}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              locale: ko,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function ResultCardSkeleton() {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
