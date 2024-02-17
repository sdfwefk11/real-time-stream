import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";

export default async function Chat() {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);
  if (!stream) {
    throw new Error("Stream not found");
  }
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat setting</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="채팅 활성화"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="채팅 딜레이"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="팔로우중일때만 채팅 활성화"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}
