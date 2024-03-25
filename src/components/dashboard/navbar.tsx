"use client";

import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Title } from "./title";
import axios from "axios";
import { useEffect, useState } from "react";
import { File } from "@/Types/fileType";
import { Banner } from "./banner";
import useTrashUpdate from "@/hooks/useTrashUpdate";
import { Publish } from "./publish";
import useFileUpdate from "@/hooks/useFileUpdate";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
  documentId:string
}

export const Navbar = ({ isCollapsed, onResetWidth, documentId }: NavbarProps) => {
  const [document, setDocument] = useState<File>();
  const [trigger, setTrigger] = useState(false);
  useFileUpdate(setTrigger);
  console.log("trigger",trigger);
  
  useEffect(() => {
    const getFIleInfo = async () => {
      const response = await axios.get(`${BASE_URL}/file/${documentId}`, {
        withCredentials: true,
      });
      setDocument(response.data);
    };
    getFIleInfo();
    return ()=> setDocument(undefined)
  }, [documentId,trigger]);

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-fit">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
          <Publish initialData={{id:document.id,isPublished:document.isPublished as boolean }} />
          </div>
        </div>
      </nav>
      {document.inTrash && <Banner documentId={document.id} />}
    </>
  );
};
