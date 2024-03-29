import { useFolderStore } from "@/store/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
type UpdateFolderFunction = Dispatch<SetStateAction<null>>;
const useFolderUpdates = (update?: UpdateFolderFunction) => {
  const updateFolder = useFolderStore(state => state.setFolder);
  useEffect(() => {
    const socket = io(`${BASE_URL}`, {
      withCredentials: true,
    });
    socket.on("folderCreated", folder => {
      updateFolder(folder);
    });
    socket.on("folderUpdated", folder => {
      update?.(folder);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useFolderUpdates;
