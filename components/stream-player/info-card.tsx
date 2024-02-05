"use client";
import { Maximize2, Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { InfoModal } from "./info-modal";
import { cn } from "@/lib/utils";
import { useToggleThumbnail } from "@/store/use-thumbnail-toggle";
import { Button } from "../ui/button";

interface InfoCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string | null;
}

export function InfoCard({
  hostIdentity,
  viewerIdentity,
  name,
  thumbnailUrl,
}: InfoCardProps) {
  const { onToggle } = useToggleThumbnail((state) => state);
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;

  if (!isHost) return null;

  const onImageClick = () => {
    onToggle();
  };

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
            {thumbnailUrl && (
              <div
                onClick={onImageClick}
                className={cn(
                  "relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10 hover:opacity-90 cursor-pointer group transition-all"
                )}
              >
                <Button
                  className="absolute z-10 right-0 group-hover:bg-background text-muted-foreground"
                  size="sm"
                  type="button"
                  variant="ghost"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Image
                  fill
                  src={thumbnailUrl}
                  alt={name}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
