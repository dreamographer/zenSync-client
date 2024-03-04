import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

const Page = () => {
  return (
    <>
      <Editor />
    </>
  );
};

export default Page;
