"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Folder, File } from "lucide-react";



import { cn } from "@/lib/utils";

import { Item } from "./item";
import { useFolderStore } from "@/store/store";

interface DocumentListProps { 
  workspaceId: string;
  level?: number;
  data?: string; //cocument data of the file
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
  const allDocuments = useFolderStore(state => state.folder);
  const documents = allDocuments.filter(ele => ele.workspaceId == workspaceId);

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  
  if (documents.length === 0) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {documents.map(document => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => onRedirect(document.id)}
            label={document.title}
            icon={Folder}
            active={params.documentId === document.id}
            onExpand={() => onExpand(document.id)}
          />
          {expanded[document.id] && (
            <Item
              label={document.title}
              icon={File}
              type="File"
            />
          )}
        </div>
      ))}
    </>
  );
};
