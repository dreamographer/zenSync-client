import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
interface Props {
  fileId: string;
  initialContent?: string;
  preview?: boolean;
}

export default function Content({ fileId, initialContent }: Props) {
  // Creates a new editor instance.
  let content 
  if (initialContent) {
    content = JSON.parse(initialContent) as PartialBlock[];
  }
  const editor = useCreateBlockNote({
    
    initialContent:content,
    
  }); 

  // Renders the editor instance using a React component.
  return <BlockNoteView editable={false} editor={editor} />;
}
