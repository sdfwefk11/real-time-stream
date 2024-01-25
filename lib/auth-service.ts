import { currentUser } from "@clerk/nextjs";
import { client } from "./client";

export async function getSelf() {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }
  const user = await client.stream_user.findUnique({
    where: { externalUserId: self.id },
  });
  if (!user) {
    throw new Error("Not found");
  }
  return user;
}

export async function getSelfByUsername(username: string) {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }
  const user = await client.stream_user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }
  return user;
}
