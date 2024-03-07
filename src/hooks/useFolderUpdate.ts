import { useFolderStore } from "@/store/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
type UpdateFolderFunction = Dispatch<SetStateAction<null>>;
const useFolderUpdates = (update?: UpdateFolderFunction) => {
  const updateFolder = useFolderStore(state => state.setFolder);
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
    socket.on("folderCreated", folder => {
      console.log("New folder created:", folder);
      updateFolder(folder);
    });
    socket.on("folderUpdated", folder => {
      console.log("New update:", folder);
      update?.(folder);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useFolderUpdates;
