"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Folder, File, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Item } from "./item";
import { useFolderStore } from "@/store/store";
import TooltipComponent from "../global/tool-tip";
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [trigger, setTrigger] = useState(false);
  const router = useRouter();
  const [folderData, setFolderData] = useState(null);
  const allFiles = useFolderStore(state => state.folder);
  const allDocuments = useFolderStore(state => state.folder);
  const documents = allDocuments.filter(ele => ele.workspaceId == workspaceId)
  const setFolder = useFolderStore(state => state.setFolder);
  const deleteFolder = useFolderStore(state => state.deleteFolder);
  useEffect(() => {
    
    setFolder(folderData);
    console.log("allDoc",documents);
  }, [folderData, trigger]);

  const handleUpdate = (id?: string, data?: { title: string }) => {
    async function update(){
      console.log(id, data);
      const response = await axios.put(`${BASE_URL}/folder/${id}`, data, {
        withCredentials: true,
      });
  
      if (response) {
        toast.success("Name Updated", {
          position: "top-center",
        });
        console.log(response.data);
        setFolderData(response.data);
        setTrigger(prev => !prev);
      }
    }
    update()
  };
  const onExpand = (documentId: string) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
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

  const handleDelete = (id: string) => {
    deleteFolder(id)
    const onDelete = async () => {
      const response = await axios.delete(`${BASE_URL}/folder/${id}`, {
        withCredentials: true,
      });

      
      if (response) {
        console.log("delte REs",response);
        router.push(`/dashboard/${params?.workspaceId}`);
        toast.warning("Folder Deleted", {
          position: "top-center",
        });
        console.log(id);
      }
    };
    onDelete()
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
      {documents
        .filter(folder => !folder.in_trash)
        .map(document => (
          <Item
            key={document.id}
            id={document.id}
            label={document.title}
            onDelete={handleDelete}
            icon={Folder}
            type="Folder"
            onUpdate={handleUpdate}
            active={params.documentId === document.id}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
          />
        ))}
    </>
  );


};
