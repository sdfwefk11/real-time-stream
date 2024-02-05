"use client";
import { Maximize2, Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import { InfoModal } from "./info-modal";
import { cn } from "@/lib/utils";
import { useToggleThumbnail } from "@/store/use-thumbnail-toggle";
import { Button } from "../ui/button";
import Image from "next/image";
import { AlertTriangle, Minimize2 } from "lucide-react";

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
  const { onToggle, isThumbnailToggle } = useToggleThumbnail((state) => state);
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
      <div
        className={cn(
          "w-full h-full z-50 top-0 fixed bottom-0 left-0 right-0 pointer-events-none bg-black bg-opacity-0 transition-all",
          isThumbnailToggle && "bg-opacity-50 pointer-events-auto"
        )}
      >
        <div
          onClick={() => onToggle()}
          className={cn(
            "absolute w-0 h-full items-center justify-center right-0 top-0 bottom-0 flex duration-500 transition-all",
            isThumbnailToggle && "opacity-100 w-full left-0"
          )}
        >
          {thumbnailUrl ? (
            <div
              className={cn(
                "absolute aspect-video group transition-all duration-300 w-0 h-0 opacity-0",
                isThumbnailToggle &&
                  "w-[440px] h-[300px] md:w-[650px] lg:w-[900px] xl:w-[1100px] md:h-[500px] lg:h-[550px] xl:h-[600px] md:ml-14 lg:ml-0 opacity-100"
              )}
            >
              <Button
                className="absolute z-50 right-1 top-1 text-muted-foreground group-hover:bg-background"
                size="icon"
                variant="ghost"
              >
                <Minimize2
                  className={cn(isThumbnailToggle ? "w-4 h-4" : "hidden")}
                />
              </Button>
              <Image
                fill
                src={thumbnailUrl}
                alt={thumbnailUrl}
                className="rounded-md object-cover border border-[#2D2E35]"
              />
            </div>
          ) : (
            <div
              className={cn(
                "absolute aspect-video group transition-all duration-300 w-[440px] h-[300px] md:w-[650px] lg:w-[900px] xl:w-[1100px] md:h-[500px] lg:h-[550px] xl:h-[600px] md:ml-14 lg:ml-0 opacity-0",
                isThumbnailToggle && "opacity-100"
              )}
            >
              <Button
                className="absolute z-50 right-1 top-1 text-muted-foreground group-hover:bg-background"
                size="icon"
                variant="ghost"
              >
                <Minimize2
                  className={cn(isThumbnailToggle ? "w-4 h-4" : "hidden")}
                />
              </Button>
              <div className="bg-background shadow w-full h-full flex items-center justify-center flex-col gap-y-3 rounded-md border border-[#2D2E35] text-muted-foreground">
                <AlertTriangle className="w-10 h-10" />
                <p className="d font-semibold">등록된 이미지가 없습니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
