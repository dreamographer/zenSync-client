"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/store/store";

import { useEdgeStore } from "@/lib/providers/edgestore";
import axios from "axios";
import { toast } from "sonner";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    const response =  axios.put(
      `${BASE_URL}/file/${params.fileId}`,
      { coverImage: '' },
      {
        withCredentials: true,
      }
    );
    
      toast.promise(response, {
        loading: "Deleting  Cover",
        success: "Cover Deleted!",
        error: "Failed to Delete Cover"
      });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[20vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className=" absolute bottom-2 left-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground  text-xs"
            variant="ghost"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="ghost"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
