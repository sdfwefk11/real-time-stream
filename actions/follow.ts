"use server";
import { followUser } from "@/lib/follow-service";
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
  } catch {
    throw new Error("Interal Error");
  }
}
