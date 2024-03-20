"use client";

import { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";

import { useCoverImage } from "@/store/store";
import { Button } from "@/components/ui/button";
import { File } from "@/Types/fileType";

// import { IconPicker } from "./icon-picker";

interface ToolbarProps {
  initialData:File | null;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {



  const coverImage = useCoverImage();

  return (
    <div className="pl-[54px] group relative">
    
      <div className=" flex items-center gap-x-1 py-4">
        {!initialData?.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="ghost"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
    
    </div>
  );
};
