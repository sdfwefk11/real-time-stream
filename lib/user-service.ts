import { client } from "./client";

export async function getUserByUsername(username: string) {
  const user = await client.stream_user.findUnique({
    where: {
      username,
    },
  });
  return user;
}
