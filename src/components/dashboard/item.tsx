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
import { useRouter } from "next/navigation";
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
import { useFileStore, useUserStore } from "@/store/store";
import TooltipComponent from "../global/tool-tip";

import { useEffect, useState } from "react";
import axios from "axios";
import { File as fileType } from "@/Types/fileType";
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
  const [files, setFiles] = useState<fileType[] | []>([]);
  const [isEditing, setIsEditing] = useState(false);
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const [update, setUpdate] = useState("");
  const [trigger, setTrigger] = useState(false);

  const handleUpdate = () => {
    setTrigger(prev => !prev);
  };
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

        if (!Files.message ) {
          const files = Files.filter((ele: fileType) => {return !ele.inTrash});
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

        setFiles(state => [...state, response.data]);
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
          response.data.id = response.data._id;
          console.log(response.data);
          setFiles(state => {
            return state.map(file => (file.id === id ? response.data : file));
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
        const response = await axios.patch(`${BASE_URL}/file/${id}`, {}, {
          withCredentials: true,
        });

      if (response) {
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
          <span className="truncate" onDoubleClick={() => setIsEditing(true)}>
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
          console.log(ele);

          return (
            <div className="w-full">
              <Item
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
