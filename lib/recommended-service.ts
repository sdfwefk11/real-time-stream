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
        AND: [
          //여러가지 쿼리를 넣고싶을때 AND
          {
            NOT: {
              //현재 로그인중인 자기자신을 제외
              id: userId,
            },
          },
          {
            NOT: {
              //팔로우중인사람은 추천목록에서 제외
              follwedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      include: { stream: true },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await client.stream_user.findMany({
      include: { stream: true },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
}
