"use client";
import { File } from "@/Types/fileType";
import { useFileStore } from "@/store/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
type UpdateFilesFunction = Dispatch<SetStateAction<[] | File[]>>;
const useFileUpdate = (updateFiles: Dispatch<SetStateAction<boolean>>) => {
  const setGlobalFiles = useFileStore(state => state.setFiles);
  const updateGlobalFiles = useFileStore(state => state.updateFile);
  useEffect(() => {
    const socket = io(`${BASE_URL}`, {
      withCredentials: true,
    });
    socket.on("fileCreated", file => {
      file.id = file._id;
      const folderId = file.folderId;

      updateFiles(state => !state);
      setGlobalFiles({ folderId: folderId, files: [file] });
    });

    socket.on("fileUpdated", update => {
      update.id = update._id;
      updateFiles(state => !state);
      updateGlobalFiles(update);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useFileUpdate;
