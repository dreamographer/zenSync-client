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
import { useEffect, useState } from "react";
import { ImMagicWand } from "react-icons/im";

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

export default function Editor() {
  const { theme, setTheme } = useTheme();
  let mode:"dark"|"light"="dark"
  if(theme=="light"){
    mode="light"

  }
  
  

  const editor: BlockNoteEditor | null = useBlockNote({
    slashMenuItems: customSlashMenuItemList,
  });

  return <BlockNoteView editor={editor} theme={mode} />;
}
