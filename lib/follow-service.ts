import { getSelf } from "./auth-service";
import { client } from "./client";

export async function getFollowedUsers() {
  try {
    const self = await getSelf();
    const followedUsers = client.stream_follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: true,
          },
        },
      },
    });
    return followedUsers;
  } catch {
    return [];
  }
}

export async function isFollowingUser(id: string) {
  try {
    const self = await getSelf();
    const otherUser = await client.stream_user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }
    if (otherUser.id === self.id) {
      return true;
    }
    const existingFollow = await client.stream_follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });
    return !!existingFollow;
    // 자바 스크립트는 기본 타입 데이터 6가지는 false, 이 외에는 모두 true 가 된다. 따라서 느낌표 두개를 붙여서 정확히 존재하면 true를 리턴해주었다.
  } catch {
    return false;
  }
}

export async function followUser(id: string) {
  const self = await getSelf();
  const otherUser = await client.stream_user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }
  const existingFollow = await client.stream_follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });
  if (existingFollow) {
    throw new Error("Alreadyy following");
  }
  const follow = await client.stream_follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });
  return follow;
}
/**
 * 팔로우 조건
 * 1. 현재 내가 팔로우 하려는게 나 자신인가
 * 2. 이미 팔로우 했는가
 * 3. 팔로우 하려는 유저가 존재하는 유저인가
 */

export async function unfollowUser(id: string) {
  const self = await getSelf();
  const otherUser = await client.stream_user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  if (self.id === otherUser.id) {
    throw new Error("Cannot unfollow yourself");
  }
  const existingFollow = await client.stream_follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });
  if (!existingFollow) {
    throw new Error("Not following");
  }
  const follow = await client.stream_follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });
  return follow;
}
