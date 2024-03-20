"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/store/store";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { useEdgeStore } from "@/lib/providers/edgestore";
import axios from "axios";
import { toast } from "sonner";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const CoverImageModal = () => {
  const params = useParams();

  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });
      const response = axios.put(
        `${BASE_URL}/file/${params.fileId}`,
        { coverImage: res.url },
        {
          withCredentials: true,
        }
      );

      toast.promise(response, {
        loading: "uploading Cover",
        success: "Cover Uploaded!",
        error: " Failed to Upload Cover.",
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
