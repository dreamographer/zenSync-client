import { useFolderStore, useWorkspaceStore } from "@/store/store";
import { useEffect } from "react";
import { io } from "socket.io-client";

const useWorkspaceUpdate = () => {
    const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
  useEffect(() => {
    const socket = io("http://localhost:5000", {
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