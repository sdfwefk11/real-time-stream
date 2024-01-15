"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";

interface WrapperProps {
  children: React.ReactNode;
}
export function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useSidebar((state) => state);
  const isClient = useIsClient();
  if (!isClient) {
    return (
      //서버사이드에서 렌더링 될때
      <aside className="fixed flex flex-col left-0 w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }
  return (
    <aside
      className={cn(
        "fixed flex flex-col left-0 w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}
