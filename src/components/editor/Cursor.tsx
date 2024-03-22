
"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";

import { useOther } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
 
  const cursor = useOther(connectionId, user => user.presence.cursor);


  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <svg
      style={{
        transform: `translateX(${x}px) translateY(${y-1250}px)`,
      }}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
     
    </svg>
  );
});

Cursor.displayName = "Cursor";