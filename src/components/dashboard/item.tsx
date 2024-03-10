"use client";

import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  PlusIcon,
  File,
  Trash,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useFileStore, useFolderStore, useUserStore } from "@/store/store";
import TooltipComponent from "../global/tool-tip";

import { useEffect, useState } from "react";
import axios from "axios";
import { File as fileType } from "@/Types/fileType";
import useFileUpdate from "@/hooks/useFileUpdate";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
interface ItemProps {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  type?: string;
  onExpand?: () => void;
  onUpdate?: (id?: string, data?: { title: string }) => void;
  onDelete?: (id: string) => void;
  label: string;
  icon: LucideIcon;
}

export const Item = ({
  id,
  label,
  onDelete,
  icon: Icon,
  active,
  documentIcon,
  type,
  onExpand,
  onUpdate,
  expanded,
}: ItemProps) => {
  const setGlobalFiles = useFileStore(state => state.setFiles);
  const updateGlobalFiles = useFileStore(state => state.updateFile);
  const GlobalFiles = useFileStore(state => state.files);
  const [isEditing, setIsEditing] = useState(false);
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const [trigger, setTrigger] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [files, setFiles] = useState<fileType[] | []>([]);
  useFileUpdate(setTrigger);
  const handleUpdate = () => {
    setTrigger(prev => !prev);
  };
useEffect(() => {
  setFiles(GlobalFiles.get(id as string) || []);
  console.log(GlobalFiles);
  
}, [GlobalFiles]);
  useEffect(() => {
    const fetchFolderData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/file/folder/${id}`,
          {
            credentials: "include",
          }
        );
        const Files = await response.json();

        if (!Files.message) {
          const files = Files.filter((ele: fileType) => {
            return !ele.inTrash;
          });
          setGlobalFiles({ folderId: id as string, files: files });
          setFiles(files);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchFolderData();
    }
  }, [id, trigger]);


  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const addNewFile = async () => {
    try {
      const data = {
        title: "Untitled",
        folderId: id,
      };

      const response = await axios.post(`${BASE_URL}/file/`, data, {
        withCredentials: true,
      });
      if (response) {
        toast.success("File Created", {
          position: "top-center",
        });
        response.data.id = response.data._id;
      }
    } catch (error) {
      console.log(error, "Error");
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message, {
          position: "top-left",
        });
        console.log("error in Workspace creation", error.response.data.message);
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  const handleEdit = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
    console.log(e.target.value);
    try {
      const data = {
        title: e.target.value,
      };

      if (type == "File") {
        const response = await axios.put(`${BASE_URL}/file/${id}`, data, {
          withCredentials: true,
        });

        if (response) {
          toast.success("Name Updated", {
            position: "top-center",
          });
        
          onUpdate?.();
          console.log("state fiels", files);
        }
      } else if (type == "Folder") {
        onUpdate?.(id, data);
      }
    } catch (error) {
      console.log(error, "Error");
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message, {
          position: "top-left",
        });
        console.log("error in Workspace creation", error.response.data.message);
      } else {
        console.log("An unexpected error occurred:", error);
      }
    } finally {
      setIsEditing(false);
    }
  };

  const moveToTrash = async () => {
    if (!id) return;
    if (type == "File") {
      const response = await axios.patch(
        `${BASE_URL}/file/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response) {
        router.push(`/dashboard/${params?.workspaceId}`);
        toast.warning("file Moved To Trash", {
          position: "top-center",
        });

        console.log(response.data);
        onUpdate?.();
        console.log("state fiels", files);
      }
    } else if (type == "Folder") {
      onDelete?.(id);
    }
  };

  const handleOpen = () => {
    console.log("hande file");
    router.replace(`/dashboard/${params.workspaceId}/${id}`);
  };

  return (
    <>
      <div
        role="button"
        style={{
          paddingLeft: type === "File" ? `40px` : "12px",
        }}
        className={cn(
          "group group/delete min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center  text-muted-foreground font-medium",
          active && "bg-primary/5 text-primary"
        )}
      >
        {type === "Folder" && (
          <div
            role="button"
            className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
            onClick={handleExpand}
          >
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          </div>
        )}
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
        )}
        {!isEditing ? (
          <span
            className="truncate"
            onClick={type === "File" ? handleOpen : undefined}
            onDoubleClick={() => setIsEditing(true)}
          >
            {label}
          </span>
        ) : (
          <input
            onBlur={handleEdit}
            type="text"
            id={id}
            defaultValue={label}
            className="bg-transparent"
          />
        )}

        <div className="ml-auto ">
          {type === "Folder" && (
            <TooltipComponent message="Delete Folder">
              <Trash
                onClick={moveToTrash}
                size={15}
                className="hover:dark:text-white hidden   group-hover/delete:block hover dark:text-Neutrals/neutrals-7 transition-colors"
              />
            </TooltipComponent>
          )}
          {type === "File" && (
            <TooltipComponent message="Delete File">
              <Trash
                onClick={moveToTrash}
                size={15}
                className="hover:dark:text-white hidden   group-hover/delete:block hover dark:text-Neutrals/neutrals-7 transition-colors"
              />
            </TooltipComponent>
          )}
          {type === "Folder" && !isEditing && (
            <TooltipComponent message="Add File">
              <PlusIcon
                onClick={addNewFile}
                size={15}
                className="hover:dark:text-white dark:text-Neutrals/neutrals-7 transition-colors"
              />
            </TooltipComponent>
          )}
        </div>
      </div>
      {expanded &&
        type === "Folder" &&
        files.length > 0 &&
        files.map(ele => {
          if (ele.inTrash) return 
            return (
              <div className="w-full">
                <Item
                  key={ele.id}
                  label={ele.title}
                  id={ele.id}
                  onUpdate={handleUpdate}
                  icon={File}
                  type="File"
                />
              </div>
            );
        })}
    </>
  );
};
