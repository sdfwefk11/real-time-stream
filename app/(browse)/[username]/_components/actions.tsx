"use client";
import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export function Actions({ isFollowing, userId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();
  //유저가 onClick을 여러번 발생시켰을때 데이터의 흐름이 이상해지는 현상을 방지하기위해 isLoading && return 같은 조건을 걸게되는데 useTransition을 사용하면 간단하게 처리해줄수있다.
  //사용방법: onClick이 발생하고 이벤트가 끝날때까지 isPending은 false가 된다. 따라서 onClick을 받고자하는 버튼에 disabled={isPending}을 주게되면 이벤트가 끝날때까지 해당 버튼이 비활성화된다.
  const onClick = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <Button
      disabled={isPending || isFollowing} // isFollowing: 현재 보고있는 프로필페이지가 나 자신의 프로필페이지이면 나 자신은 팔로우 할수 없기 때문에 Follow 버튼 비활성화
      onClick={onClick}
      variant="primary"
    >
      Follow
    </Button>
  );
}
