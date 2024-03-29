"use client"
import { Airplay } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { MediaRoom } from '../videoRoom/media-room';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { TooltipComponent } from "../global/tool-tip";

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
      <TooltipComponent message="Join Call">
        <div
          id="Conference"
          onClick={toggleModal}
          className="p-5  z-50 items-center justify-center inline-flex  cursor-pointer overflow-hidden  absolute bottom-10 bg-brand/brand-WashedBlue tracking-tighter group right-10 rounded-full rounded-br-none w-fit "
        >
          <span className="absolute  w-0 z-0 h-0 p-0 transition-all duration-200 ease-out bg-brand/brand-Dark rounded-full group-hover:w-24 group-hover:h-24"></span>
          <Airplay className="z-50 text-white" />
        </div>
      </TooltipComponent>
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