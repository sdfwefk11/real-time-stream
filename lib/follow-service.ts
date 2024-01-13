import { getSelf } from "./auth-service";
import { client } from "./client";

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
  } catch {
    return false;
  }
}
