"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { File } from "@/Types/fileType";
import { Toolbar } from "@/components/dashboard/toolbar";
import { Cover } from "@/components/dashboard/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Editor } from "@/components/editor/Editor";
import Content from "@/components/public/Content";
interface DocumentIdPageProps {
  params: {
    documentId: string;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const [file, setFile] = useState<File | undefined>(undefined); 

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/file/${params.documentId}`,
          {
            credentials: "include",
          }
        );
        const fileData = await response.json();
        setFile(fileData);
        console.log(fileData);
      } catch (error) {
        console.log(error);
      }
    };
    if (params.documentId) {
      fetchFileData();
    }
  }, [params.documentId]);

  if (file === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (file === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40 bg-[#1F1F1F] h-full">
      <Cover preview url={file?.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={file} />
        <Content fileId={params.documentId} initialContent={file?.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
