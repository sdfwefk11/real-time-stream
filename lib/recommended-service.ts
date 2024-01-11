import { client } from "./client";

export async function getRecommended() {
  const users = await client.stream_User.findMany({
    orderBy: {
      createAt: "desc",
    },
  });
  return users;
}
