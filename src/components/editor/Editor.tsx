"use client";
import { useEffect, useState } from "react";
import { connectionIdToColor } from "@/lib/utils";
import {
  BlockNoteEditor,
  PartialBlock,
  filterSuggestionItems,
} from "@blocknote/core";
import {
  useCreateBlockNote,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  BlockNoteView,
  DefaultReactSuggestionItem,
} from "@blocknote/react";
import { useEdgeStore } from "@/lib/providers/edgestore";
import * as Y from "yjs";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import { ImMagicWand } from "react-icons/im";
import LiveblocksProvider from "@liveblocks/yjs";
import {
  useMutation,
  useRoom,
  useSelf,
  useUpdateMyPresence,
} from "../../liveblocks.config";
import { io } from "socket.io-client";
import { useUserStore } from "@/store/store";
import { Cursor } from "../room/cursor";
import { CursorsPresence } from "../room/cursors-presence";
import { group } from "console";
import { useCompletion } from "ai/react";
import Presence from "./Presence";
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

interface GetPrevTextOptions {
  chars: number;
  offset: number;
}

export function Editor({ fileId }: Props) {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

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

  return (
    <>
      <BlockNote doc={doc} provider={provider} fileId={fileId} />;
    
    </>
  );
}

function BlockNote({ doc, provider, fileId }: EditorProps) {
  const {edgestore} =useEdgeStore()
  const currentUser = useSelf();
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
 const handleUpload = async (file: File) => {
   const response = await edgestore.publicFiles.upload({
     file,
   });

   return response.url;
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
  if (theme === "light") {
    mode = "light";
  }

  const editor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment(fileId),
      user: {
        name: user?.fullname as string,
        color: connectionIdToColor(currentUser.connectionId),
      },
    },
    uploadFile:handleUpload,
    
  });
doc.on("update", (update, origin, doc) => {
    const data = {
      id: fileId,
      content:JSON.stringify(editor.document)
    };
    socket.emit("updateContent", data);
  });

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = {
        x: Math.round(e.clientX),
        y: Math.round(e.clientY), 
      };
      
      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
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
      
    </div>
  );
}
