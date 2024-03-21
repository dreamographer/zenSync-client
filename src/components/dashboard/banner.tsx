"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/global/ConfirmModal";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
interface BannerProps {
  documentId: string;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const params = useParams();

    const onRemove = () => {
      const promise = axios.delete(`${BASE_URL}/file/${documentId}`, {
        withCredentials: true,
      });

      toast.promise(promise, {
        loading: "Deleting note...",
        success: "Note deleted!",
        error: " Failed to delete note.",
      });

        router.push(`/dashboard/${params.workspaceId}`);
      
    };

const onRestore = () => {
      const response = axios
        .patch(
          `${BASE_URL}/file/trash/${documentId}`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(res => {
        //   return setTrash(state =>
        //     state.filter(file => file.id != res.data._id)
        //   );
        });

      toast.promise(response, {
        loading: "Restoring note...",
        success: "Note restored!",
        error: " Failed to restore note.",
      });
      router.push(`/dashboard/${params.workspaceId}`);
    };
  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
