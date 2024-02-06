"use client";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useTracks } from "@livekit/components-react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";
import { cn } from "@/lib/utils";

interface LiveVideoProps {
  participant: Participant;
}

export function LiveVideo({ participant }: LiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMouseMove, setIsMouseMove] = useState(false);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };
  const toggleMuted = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };
  const handleMouseMove = () => {
    if (isMouseMove) return;
    setIsMouseMove(true);
    setTimeout(() => {
      setIsMouseMove(false);
    }, 3000);
  };
  useEffect(() => {
    onVolumeChange(100);
  }, []);

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);
  return (
    <div
      ref={wrapperRef}
      className="relative h-full flex"
      onMouseMove={handleMouseMove}
    >
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full transition-all">
        <div
          className={cn(
            "absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-800 px-4 opacity-0 hover:opacity-100",
            isMouseMove && "opacity-100"
          )}
        >
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMuted}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
}
