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
import { io } from "socket.io-client";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const socket = io(BASE_URL as string, {
  withCredentials: true,
});
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
      fragment: doc.getXmlFragment(),
      // Information (name and color) for this user:
      user: {
        name: "My Username",
        color: "#ff0000",
      },
    },
    slashMenuItems: customSlashMenuItemList,
  });

  doc.on("update", (update, origin, doc) => {
    const data = {
      id: fileId,
      content:JSON.stringify(editor.topLevelBlocks)
    };
    socket.emit("updateContent", data);
  });

  return <BlockNoteView editor={editor} theme={mode} />
}
