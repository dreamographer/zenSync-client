import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { clearStorage } from "persist-and-sync";
import { useRouter } from "next/navigation";
import { useFolderStore, useUserStore, useWorkspaceStore } from "@/store/store";
const LogoutButton = () => {
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);
  const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
  const setFolder = useFolderStore(state => state.setFolder);

  const logout = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
      {
        withCredentials: true,
      }
    );
    if (response) {
      clearStorage("userInfo", "localStorage");
      clearStorage("workspaceInfo", "localStorage");


      setFolder(null);
      setUser(null);
      setWorkspace(null);
      router.replace("/login");
    }
  };
  return <Button onClick={logout}>LOGOUT</Button>;
};

export default LogoutButton;
