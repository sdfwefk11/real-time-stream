import { client } from "./client";

export async function getStreamByUserId(userId: string) {
  const stream = await client.stream_stream.findUnique({
    where: {
      userId,
    },
  });
  return stream;
}
