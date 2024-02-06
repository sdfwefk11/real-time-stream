"use server";

import { getSelf } from "@/lib/auth-service";
import { client } from "@/lib/client";
import { revalidatePath } from "next/cache";
import { Stream_user } from "prisma/prisma-client";

export async function updateUser(values: Partial<Stream_user>) {
  const self = await getSelf();

  const validData = {
    bio: values.bio,
  };

  const user = await client.stream_user.update({
    where: {
      id: self.id,
    },
    data: {
      ...validData,
    },
  });
  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/${self.username}`);

  return user;
}
