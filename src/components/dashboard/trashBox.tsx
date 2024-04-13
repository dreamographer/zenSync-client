"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Trash, Undo } from "lucide-react";
import { toast } from "sonner";

import axios from "axios";
import { File } from "@/Types/fileType";
import { ConfirmModal } from "../global/ConfirmModal";
import useTrashUpdate from "@/hooks/useTrashUpdate";
import { useFolderStore } from "@/store/store";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const TrashBox = () => {
  const router = useRouter(); 
  const params = useParams();
  const [trashFiles, setTrash] = useState<File[] | []>([]);
    const allDocuments = useFolderStore(state => state.folder);
useTrashUpdate(setTrash);
  useEffect(() => {
    const fetchTrashData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/file/trash`, {
          withCredentials: true,
        });
        const TrashFiles = response.data.filter((file: File) =>
          allDocuments.some(folder=>folder.id===file.folderId)
          );
      
          // folder.id==file.folderId

        // const TrashFiles = response.data.map((file:File)=>{ 
        //   return files
        // });
        
        
        
        if (!TrashFiles.message) {
          setTrash(TrashFiles);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrashData();
  }, []);

 
  const onClick = (documentId: string) => {
    router.push(`/dashboard/${params.workspaceId}/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: string
  ) => {
    event.stopPropagation();
    const response = axios.patch(`${BASE_URL}/file/trash/${documentId}`,{}, {
      withCredentials: true,
    }).then((res)=>{ return setTrash(state=>state.filter(file =>file.id != res.data._id))});

    toast.promise(response, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: " Failed to restore note.",
    });
  };

  const onRemove = (documentId:string) => {
    const promise = axios.delete(`${BASE_URL}/file/${documentId}`, {
      withCredentials: true,
    });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: " Failed to delete note.",
    });

    if (params.fileId === documentId) {
      router.push(`/dashboard/${params.workspaceId}`);
    }
  };

//   if (documents === undefined) {
//     return (
//       <div className="h-full flex items-center justify-center p-4">
//         <Spinner size="lg" />
//       </div>
//     );
//   }

  return (
    <div className="text-sm">
      <div className="flex gap-2 justify-center mt-4">
        <p>Trash</p>
        <Trash className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {trashFiles?.map(document => (
          <div
            key={document.id}
            role="button"
            onClick={() => onClick(document.id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={e => onRestore(e, document.id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document.id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
