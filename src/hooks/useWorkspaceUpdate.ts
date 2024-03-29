import { useWorkspaceStore } from "@/store/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type UpdateWSFunction = Dispatch<SetStateAction<null>>;
const useWorkspaceUpdate = (updateWS: UpdateWSFunction) => {
  const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
  useEffect(() => {
    const socket = io(`${BASE_URL}`, {
      withCredentials: true,
    });
    socket.on("userWorkspacesUpdated", updatedWorkspaces => {
      console.log("New  WS created:", updatedWorkspaces);
      setWorkspace(updatedWorkspaces);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useWorkspaceUpdate;