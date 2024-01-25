import { client } from "./client";

export async function getUserByUsername(username: string) {
  const user = await client.stream_user.findUnique({
    where: {
      username,
    },
    include: { stream: true },
  });
  return user;
}

export async function getUserById(id: string) {
  const user = await client.stream_user.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  });
  return user;
}
