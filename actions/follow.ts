"use server";
import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

//서버액션
export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);
    revalidatePath("/");
    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }
    return followedUser;
  } catch (error) {
    throw new Error("Interal Error");
  }
}

export async function onUnfollow(id: string) {
  try {
    const unfollowedUser = await unfollowUser(id);
    revalidatePath("/");
    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }
    return unfollowedUser;
  } catch (error) {
    throw new Error("Interal Error");
  }
}
