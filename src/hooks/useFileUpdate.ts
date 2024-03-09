'use client'
import { File } from "@/Types/fileType";
import { useFileStore } from "@/store/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
type UpdateFilesFunction = Dispatch<SetStateAction<[] | File[]>>;
const useFileUpdate =( updateFiles:UpdateFilesFunction)=> {
    const setGlobalFiles = useFileStore(state => state.setFiles);
    const updateGlobalFiles = useFileStore(state => state.updateFile);
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
    socket.on("fileCreated", file => {
      console.log("New  file created:", file);
      file.id = file._id;
      updateFiles(state => [...state, file]);
      setGlobalFiles(file)
    });

    socket.on("fileUpdated", update => {
      update.id=update._id
      
      updateFiles(state => { 
        const existingFileIndex = state.findIndex(file => file.id === update.id);
        if (existingFileIndex !== -1) {
          return state.map((file, index) =>{
            console.log('updac check',update);
            
            return index === existingFileIndex ? update : file}
            );
      } else {
        return [...state, update];
      }
      });
      updateGlobalFiles(update)
    });

  

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useFileUpdate;
