"use server";
import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function onBlock(id: string) {
  const self = await getSelf();
  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch {
    //해당유저가 guest일때
  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {
    //해당유저가 방송에 없을때
  }

  revalidatePath(`/u/${self.username}/community`);
  return blockedUser;
}

export async function onUnblock(id: string) {
  const self = await getSelf();
  const unblockedUser = await unblockUser(id);

  revalidatePath(`/u/${self.username}/community`);
  return unblockedUser;
}
