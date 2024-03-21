import { useOthers } from "@/liveblocks.config";
import { Cursor } from "./Cursor";

// Pass this to RoomProvider
const initialPresence = { cursor: { x: 0, y: 0 } };

export default function Presence() {
  const others = useOthers();

  return (
    <>
      {others.map(({ connectionId, presence }) => { 
        return <Cursor key={connectionId}  connectionId={connectionId} />;
      })}
    </>
  );
}
