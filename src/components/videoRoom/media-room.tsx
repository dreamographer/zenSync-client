"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  PreJoin,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/store";
import { cn } from "@/lib/utils";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  isMinimized: boolean;
}

export const MediaRoom = ({
  chatId,
  video,
  audio,
  isMinimized,
}: MediaRoomProps) => {
  const user = useUserStore(state => state.user);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.fullname) return;

    const name = `${user.fullname}`;

    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [user?.fullname, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Connecting...
        </p>
      </div>
    );
  }

  return (
    <>
      <LiveKitRoom
        className={cn(isMinimized ? "hidden" : "block")}
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
      >
        <VideoConference />
      </LiveKitRoom>
    </>
  );
};
