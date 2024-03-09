"use client";
import { File } from "@/Types/fileType";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
type UpdateFilesFunction = Dispatch<SetStateAction<[] | File[]>>;
const useTrashUpdate = (updateFiles: UpdateFilesFunction) => {
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });

    socket.on("addToTrash", update => {
      update.id = update._id;
      updateFiles(state => {
        return [...state,update]
      });
    });
    socket.on("removedTrash", update => {
      if (update.id) {
        updateFiles(state => {
          return state.filter(file => file.id != update.id);
        });
        return;
      }
      update.id = update._id;
      updateFiles(state => {
        return state.filter(file => file.id != update.id);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useTrashUpdate;
