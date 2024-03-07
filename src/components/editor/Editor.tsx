"use client";
import { BlockNoteEditor } from "@blocknote/core"; 
import {
  BlockNoteView,
  getDefaultReactSlashMenuItems,
  ReactSlashMenuItem,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import { ImMagicWand } from "react-icons/im";


// collaboration

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";  //Production
import { useParams } from "next/navigation";
import YPartyKitProvider from "y-partykit/provider";

//development


const insertMagicAi = (editor: BlockNoteEditor) => {
  console.log("Magic AI insertion incoming!");
};


const insertMagicItem: ReactSlashMenuItem = {
  name: "Continue with AI",
  execute: insertMagicAi,
  aliases: ["ai", "magic"],
  group: "Magic",
  icon: <ImMagicWand size={18} />,
  hint: "Continue your idea with some extra inspiration!",
};

const customSlashMenuItemList = [
  insertMagicItem,
  ...getDefaultReactSlashMenuItems(),
];

interface Props{
  fileId:string
}



export default function Editor({fileId}:Props) {
  console.log(fileId);
  
  const { theme, setTheme } = useTheme();
    let mode: "dark" | "light" = "dark";
  if (theme == "light") {
    mode = "light";
  }
  
const doc = new Y.Doc();
  // const provider = new WebrtcProvider(params.fileId as string, doc); //production
const provider = new YPartyKitProvider(
  "blocknote-dev.yousefed.partykit.dev",
  // use a unique name as a "room" for your application:
  fileId,
  doc
);
  const editor: BlockNoteEditor | null = useBlockNote({
    collaboration: {
      // The Yjs Provider responsible for transporting updates:
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),
      // Information (name and color) for this user:
      user: {
        name: "My Username",
        color: "#ff0000",
      },
    },
    slashMenuItems: customSlashMenuItemList,
  });

  return <BlockNoteView editor={editor} theme={mode} />
}
