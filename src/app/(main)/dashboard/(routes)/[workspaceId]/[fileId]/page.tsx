"use client";

import { RoomProvider } from "@/liveblocks.config";
import { Editor } from "@/components/editor/Editor";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Page({
  params,
}: {
  params: { workspaceId: string; fileId: string };
}) {
  return (
    <RoomProvider id={params.workspaceId} initialPresence={{}}>
      <ClientSideSuspense fallback="Loading…">
        {() => <Editor fileId={params.fileId}/>}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
