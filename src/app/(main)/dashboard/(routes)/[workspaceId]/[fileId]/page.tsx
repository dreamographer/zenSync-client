"use client";

import { RoomProvider } from "@/liveblocks.config";
import { Editor } from "@/components/editor/Editor";
import { ClientSideSuspense } from "@liveblocks/react";
import { Toolbar } from "@/components/dashboard/toolbar";
import { useFileStore } from "@/store/store";
import { useEffect, useState } from "react"; // Import useState
import { File } from "@/Types/fileType";
import { Cover } from "@/components/dashboard/cover";

export default function Page({
  params,
}: {
  params: { workspaceId: string; fileId: string };
}) {
  const [file, setFile] = useState<File | null>(null); // Use state to update file
const files = useFileStore(state => state.files);
  useEffect(() => {
    const fetchFolderData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/file/${params.fileId}`,
          {
            credentials: "include",
          }
        );
        const fileData = await response.json();
        setFile(fileData);
        console.log(fileData);
      } catch (error) {
        console.log(error);
      }
    };
    if (params.fileId) {
      fetchFolderData();
    }
  }, [params.fileId, files]);

  return (
    <RoomProvider
      id={params.workspaceId}
      initialPresence={{ cursor: { x: 0, y: 0 } }}
    >
      <Cover url={file?.coverImage} />
      <Toolbar initialData={file} />
      <ClientSideSuspense fallback="Loading…">
        {() => <Editor fileId={params.fileId} />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
