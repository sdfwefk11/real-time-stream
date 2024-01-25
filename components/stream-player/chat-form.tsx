"use client";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
}

export function ChatForm({
  onChange,
  onSubmit,
  isDelayed,
  isFollowersOnly,
  isFollowing,
  isHidden,
}: ChatFormProps) {
  return (
    <form className="flex flex-col items-center gap-y-4 p-3">Chat form</form>
  );
}
