"use client";
import VideoRoomToggle from "@/components/global/VideoRoomToggle";
import { MediaRoom } from "@/components/videoRoom/media-room";
import { Presentation } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const toggleModal = () => {
    setIsOpen(true);
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      <VideoRoomToggle />
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={toggleModal}
      >
        Toggle Modal
      </button>

      {isOpen&&(<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <MediaRoom
          isMinimized={isMinimized}
          audio={true}
          chatId="123"
          video={true}
        />
      </div>)} */}
    </>
  );
};
export default Page;
