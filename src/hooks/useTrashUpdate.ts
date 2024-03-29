"use client";
import { File } from "@/Types/fileType";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type UpdateFilesFunction = Dispatch<SetStateAction<[] | File[]>>;
const useTrashUpdate = (updateFiles: UpdateFilesFunction) => {
  useEffect(() => {
    const socket = io(`${BASE_URL}`, {
      withCredentials: true,
    });  

    socket.on("addToTrash", update => {
      update.id = update._id;
      updateFiles(state => {
        return [...state,update]
      });
    });

    socket.on("removedTrash", update => {
      console.log("update",update);
       
      if (update._id) {
        update.id = update._id;
        updateFiles(state => {
          return state.filter(file => file.id != update.id);
        });
        return;
      }
      updateFiles(state => {
        return state.filter(file => file.id != update);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useTrashUpdate;
