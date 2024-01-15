import { getSelf } from "./auth-service";
import { client } from "./client";

export async function getRecommended() {
  //로그인중일때와 로그인중이 아닐때 추천목록을 다르게 보여주는 로직
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await client.stream_user.findMany({
      where: {
        //현재 로그인중인 자기자신을 제외
        NOT: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await client.stream_user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
}
