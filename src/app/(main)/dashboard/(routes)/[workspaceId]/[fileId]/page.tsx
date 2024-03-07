import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

const Filepage = ({ params }: { params: { workspaceId :string,fileId:string} }) => {
  return (
    <div>
      <Editor fileId={params.fileId} />
    </div>
  );
};

export default Filepage;
