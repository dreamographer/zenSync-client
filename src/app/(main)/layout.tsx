import dynamic from "next/dynamic";
import { MediaRoom } from "@/components/videoRoom/media-room";
import React from "react";

const MainLayout =  ({ children }: { children: React.ReactNode }) => {
  const VideoRoomToggle = dynamic(
    () => import("@/components/global/VideoRoomToggle"),
    {
      ssr: false,
    }
  );
return (
  <><VideoRoomToggle />
    {children}
  </>
);
};

export default MainLayout;
