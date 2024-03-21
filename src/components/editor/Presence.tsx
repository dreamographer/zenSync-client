import { useOthers, useUpdateMyPresence } from "@/liveblocks.config";
import { Cursor } from "../room/cursor";

// Pass this to RoomProvider
const initialPresence = { cursor: { x: 0, y: 0 } };

export default function Presence() {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();
  // On client A: [{"cursor":null}]
  // On client B: [{"cursor":null}]

  return (
    <div
      onPointerMove={event => {
        updateMyPresence({
          cursor: {
            x: event.clientX,
            y: event.clientY,
          },
        });
      }}
    >
      {others.map(({ connectionId, presence }) => { 
        return <Cursor key={connectionId}  connectionId={connectionId} />;
      })}
    </div>
  );
}
