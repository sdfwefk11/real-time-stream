"use server";
import { revalidatePath } from "next/cache";
import { getSelf } from "@/lib/auth-service";
import { client } from "@/lib/client";
import { Stream_stream } from "prisma/prisma-client";

export async function updateStream(value: Partial<Stream_stream>) {
  try {
    const self = await getSelf();
    const selfStream = await client.stream_stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      name: value.name,
      isChatEnabled: value.isChatEnabled,
      isChatFollowersOnly: value.isChatFollowersOnly,
      isChatDelayed: value.isChatDelayed,
    };

    const stream = await client.stream_stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });
    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch {
    throw new Error("Internal Error");
  }
}
