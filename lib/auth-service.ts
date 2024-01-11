import { currentUser } from "@clerk/nextjs";
import { client } from "./client";

export async function getSelf() {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }
  const user = await client.stream_User.findUnique({
    where: { externalUserId: self.id },
  });
  if (!user) {
    throw new Error("Not found");
  }
  return user;
}
