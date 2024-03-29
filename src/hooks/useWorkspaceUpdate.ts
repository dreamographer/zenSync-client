import { useWorkspaceStore } from "@/store/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { io } from "socket.io-client";
type UpdateWSFunction = Dispatch<SetStateAction<null>>;
const useWorkspaceUpdate = (updateWS: UpdateWSFunction) => {
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