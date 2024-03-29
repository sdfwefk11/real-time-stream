import { client } from "./client";

export async function getUserByUsername(username: string) {
  const user = await client.stream_user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: { select: { follwedBy: true } },
    },
  });
  return user;
}

export async function getUserById(id: string) {
  const user = await client.stream_user.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  });
  return user;
}
