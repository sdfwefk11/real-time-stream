import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

export function UnblockButton({ userId }: UnblockButtonProps) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((res) =>
          toast.success(`${res.blocked.username} 차단해제 되었습니다`)
        )
        .catch(() => toast.error("서버 응답 오류"));
    });
  };
  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      차단해제
    </Button>
  );
}
