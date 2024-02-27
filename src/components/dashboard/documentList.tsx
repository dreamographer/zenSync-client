"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Folder, File, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Item } from "./item";
import { useFolderStore } from "@/store/store";
import TooltipComponent from "../global/tool-tip";
import { Accordion } from "../ui/accordion";
import axios from "axios";
import { toast } from "sonner";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
interface DocumentListProps {
  workspaceId: string;
  level?: number;
  data?: string;
}

export const DocumentList = ({ workspaceId, level = 0 }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
    const [folderData, setFolderData] = useState(null);
  const allFiles = useFolderStore(state => state.folder);
  const allDocuments = useFolderStore(state => state.folder);
  const documents = allDocuments.filter(ele => ele.workspaceId == workspaceId);
  const setFolder = useFolderStore(state => state.setFolder);
  useEffect(() => {
    setFolder(folderData);
  }, [folderData]);
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const handleFolderCreate = () => {
    const createfolder = async () => {
      try {
        const data = {
          title: "Untitled",
          workspaceId: params?.workspaceId,
        };

        const response = await axios.post(`${BASE_URL}/folder/`, data, {
          withCredentials: true,
        });
        if (response) {
          toast.success("Folder Created", {
            position: "top-center",
          });

          setFolderData(response.data);
        }
      } catch (error) {
        console.log(error, "Error");
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          toast.error(error.response.data.message, {
            position: "top-left",
          });
          console.log(
            "error in Workspace creation",
            error.response.data.message
          );
        } else {
          console.log("An unexpected error occurred:", error);
        }
      }
    };
    createfolder();
  };


  return (
    <>
      <div
        className="flex
        sticky 
        z-20 
        top-0 
        w-full  
        h-10 
        group/title 
        justify-between 
        items-center 
        pr-4 
        text-Neutrals/neutrals-8
  "
      >
        <span
          className="text-Neutrals-8 
        font-bold 
        text-xs"
        >
          FOLDERS
        </span>
        <TooltipComponent message="Create Folder">
          <PlusIcon
            onClick={handleFolderCreate}
            size={16}
            className="group-hover/title:inline-block
            hidden 
            cursor-pointer
            hover:dark:text-white
          "
          />
        </TooltipComponent>
      </div>
      <Accordion type="multiple" defaultValue={[""]} className="pb-20">
        {documents
          .filter(folder => !folder.in_trash)
          .map(document => (
            <Item
              id={document.id}
              label={document.title}
              icon={Folder}
              type="Folder"
              active={params.documentId === document.id}
              onExpand={() => onExpand(document.id)}
              expanded={expanded[document.id]}
            />
            
                
          ))}
      </Accordion>
    </>
  );

  // return (
  //   <>
  //     {documents.map(document => (
  //       <div key={document.id}>
  //         <Item
  //           id={document.id}
  //           onClick={() => onRedirect(document.id)}
  //           label={document.title}
  //           icon={Folder}
  //           active={params.documentId === document.id}
  //           onExpand={() => onExpand(document.id)}
  //         />
  //         {expanded[document.id] &&  (
  //           <Item
  //             label={document.title}
  //             icon={File}
  //             type="File"
  //           />
  //         )}
  //       </div>
  //     ))}
  //   </>
  // );
};
