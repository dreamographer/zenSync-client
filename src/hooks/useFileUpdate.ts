"use client";
import { File } from "@/Types/fileType";
import { useFileStore } from "@/store/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
type UpdateFilesFunction = Dispatch<SetStateAction<[] | File[]>>;
const useFileUpdate = (updateFiles: Dispatch<SetStateAction<boolean>>) => {
  const setGlobalFiles = useFileStore(state => state.setFiles);
  const updateGlobalFiles = useFileStore(state => state.updateFile);
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
    socket.on("fileCreated", file => {
      file.id = file._id;
      const folderId = file.folderId;

      updateFiles(state=>!state)
      setGlobalFiles({ folderId: folderId, files: [file] });
    });
    
    socket.on("fileUpdated", update => {
      update.id = update._id;
      updateGlobalFiles(update);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useFileUpdate;
