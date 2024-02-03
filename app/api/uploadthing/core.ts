import { getSelf } from "@/lib/auth-service";
import { client } from "@/lib/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({ image: { maxFileCount: 1 } })
    .middleware(async () => {
      const self = await getSelf();
      return { user: self };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      await client.stream_stream.update({
        where: { userId: metadata.user.id },
        data: {
          thumbnailUrl: file.url,
        },
      });
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
