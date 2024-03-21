"use client";
import { useEffect, useState } from "react";
import { connectionIdToColor } from "@/lib/utils";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import * as Y from "yjs";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";

import { ImMagicWand } from "react-icons/im";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom } from "../../liveblocks.config";
import { io } from "socket.io-client";
import { useUserStore } from "@/store/store";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const socket = io(BASE_URL as string, {
  withCredentials: true,
});
type EditorProps = {
  doc: Y.Doc;
  provider: any; 
  fileId: string;
};
interface Props {
  fileId: string;
}

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
export function Editor({ fileId }: Props) {
  const insertMagicAi = (editor: BlockNoteEditor) => {
    console.log("Magic AI insertion incoming!");
  };


  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <BlockNote doc={doc} provider={provider} fileId ={fileId}/>;
}

function BlockNote({ doc, provider, fileId }: EditorProps) {
  const { complete } = useCompletion({
    id: "hackathon_starter",
    api: "/api/generate",
    onResponse: response => {
      if (response.status === 429) {
        return;
      }
      if (response.body) {
        const reader = response.body.getReader();
        let decoder = new TextDecoder();
        reader.read().then(function processText({ done, value }) {
          if (done) {
            return;
          }
          let chunk = decoder.decode(value, { stream: true });
          editor?._tiptapEditor.commands.insertContent(chunk);
          reader.read().then(processText);
        });
      } else {
        console.error("Response body is null");
      }
    },
    onError: e => {
      console.error(e.message);
    },
  });

  const getPrevText = (
    editor: BlockNoteEditor,
    {
      chars,
      offset = 0,
    }: {
      chars: number;
      offset?: number;
    }
  ) => {
    // Get the editor's content
    const content = editor._tiptapEditor.getText();

    // Calculate the starting point
    const start = Math.max(0, content.length - chars - offset);

    // Slice the content to get the desired number of characters
    const prevText = content.slice(start, start + chars);

    return prevText;
  };

  const insertMagicItem = (
    editor: BlockNoteEditor
  ): DefaultReactSuggestionItem => ({
    title: "Continue with AI",
    onItemClick: () => {
      complete(
        getPrevText(editor, {
          chars: 5000,
          offset: 1,
        })
      );
    },
    aliases: ["ai", "magic"],
    group: "Magic",
    icon: <ImMagicWand size={18} />,
    subtext: "Continue your idea with some extra inspiration!",
  });

  const getCustomSlashMenuItems = (
    editor: BlockNoteEditor
  ): DefaultReactSuggestionItem[] => [
    insertMagicItem(editor),
    ...getDefaultReactSlashMenuItems(editor),
  ];

  const user = useUserStore(state => state.user);
  const { theme, setTheme } = useTheme();
  let mode: "dark" | "light" = "dark";
  if (theme == "light") {
    mode = "light";
  }
  const editor: BlockNoteEditor = useBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment(fileId),

      // Information for this user:
      user: {
        name: user?.fullname as string,
        color:connectionIdToColor(doc.clientID),
      },
    },
  });

  const updateMyPresence = useUpdateMyPresence();

  return (
    <div
      onPointerMove={event => {
        
        updateMyPresence({
          cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY),
          },
        });
      }}
      onPointerLeave={() =>
        updateMyPresence({
          cursor: null,
        })
      }
      className="w-full h-full"
    >
      <BlockNoteView editor={editor} theme={mode} slashMenu={false}>
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async query =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
          <CursorsPresence />
   </div>
  );
}
