import { create } from "zustand";

interface ToggleThumbnailStore {
  isThumbnailToggle: boolean;
  onToggle: () => void;
}

export const useToggleThumbnail = create<ToggleThumbnailStore>((set) => ({
  isThumbnailToggle: false,
  onToggle: () =>
    set((state) => ({ isThumbnailToggle: !state.isThumbnailToggle })),
}));
