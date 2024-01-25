import { getSelf } from "./auth-service";
import { client } from "./client";

//blocker: 차단건사람
//blocked: 차단된사람

export async function isBlockedByUser(id: string) {
  try {
    const self = await getSelf();
    const otherUser = await client.stream_user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }
    if (otherUser.id === self.id) {
      return false;
    }
    const existingblock = await client.stream_block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });
    return !!existingblock;
  } catch {
    return false;
  }
}

export async function blockUser(id: string) {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("Cannot block yourself");
  }
  const otherUser = await client.stream_user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  const existingBlock = await client.stream_block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });
  if (existingBlock) {
    throw new Error("Already blocked");
  }
  const block = await client.stream_block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });
  return block;
}

export async function unblockUser(id: string) {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("Cannot unBlock yourself");
  }
  const otherUser = await client.stream_user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  const existingBlock = await client.stream_block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });
  if (!existingBlock) {
    throw new Error("Not blocked");
  }
  const unblock = await client.stream_block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });
  return unblock;
}
