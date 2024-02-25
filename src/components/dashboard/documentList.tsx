"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Folder, File } from "lucide-react";



import { cn } from "@/lib/utils";

import { Item } from "./item";
import { useFolderStore } from "@/store/store";

interface DocumentListProps {
  parentFolderId?: string;
  level?: number;
  data?: string; //cocument data of the file
}

export const DocumentList = ({ parentFolderId, level = 0 }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
  const documents = useFolderStore(state => state.folder);
  
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
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No Files inside
      </p>
      {documents.map(document => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => onRedirect(document.id)}
            label={document.title}
            icon={Folder}
            // documentIcon={document.icon}
            active={params.documentId === document.id}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
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
