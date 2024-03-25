"use client"
import { Airplay } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { MediaRoom } from '../videoRoom/media-room';
import { useRoomContext } from "@livekit/components-react";
import { useConnectionState } from "@livekit/components-react";
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

const VideoRoomToggle = () => {
  const params = useParams();

  
      const [isOpen, setIsOpen] = useState( false);
      const [isColab,setColab]=useState(false)
      const [isMinimized, setIsMinimized] = useState(false);
      const toggleModal = () => {
        setIsOpen(true);
        setIsMinimized(!isMinimized);
      };
      useEffect(()=>{
        setIsOpen(false);
      },[params.workspaceId])
  return (
    <>
      <div
        onClick={toggleModal}
        className="p-5 z-50 items-center justify-center inline-flex border cursor-pointer overflow-hidden  absolute bottom-10 bg-brand/brand-WashedBlue tracking-tighter group right-10 rounded-full rounded-br-none w-fit "
      >
        <span className="absolute w-0 z-0 h-0 p-0 transition-all duration-200 ease-out bg-yellow-300 rounded-full group-hover:w-full group-hover:h-full"></span>
        <Airplay className="z-50 text-white" />
      </div>
      {isOpen && (
        <div
          className={cn(
            isMinimized ? "hidden" : "block",
            " w-full h-full  px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
          )}
        >
          <MediaRoom
            isMinimized={isMinimized}
            audio={true}
            chatId={params.workspaceId as string}
            video={false}
          />
        </div>
      )}
    </>
  );
}

export default VideoRoomToggle