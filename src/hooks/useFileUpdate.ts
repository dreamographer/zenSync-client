import { File } from "@/Types/fileType";
import { useFileStore, useFolderStore } from "@/store/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
type UpdateFilesFunction = Dispatch<SetStateAction<[] | File[]>>;
const useFileUpdate =( updateFiles:UpdateFilesFunction)=> {
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
    socket.on("fileCreated", file => {
      console.log("New  file created:", file);
      updateFiles(state => [...state, file]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useFileUpdate;
