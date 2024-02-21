'use client'
import { useUserStore, useWorkspaceStore } from '@/store/store'
import React from 'react'

import { useRouter } from "next/navigation";
import { Button } from '../ui/button'
import { clearStorage } from 'persist-and-sync'
import axios from 'axios'

interface SidebarProps{
        params:{workspaceId:string}
    className?:string
}
const Sidebar:React.FC<SidebarProps> = ({ params,className}) => {
    const router = useRouter();
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const workspace = useWorkspaceStore(state => state.workspace);
  const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
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
        setUser(null)
        setWorkspace(null)
        router.replace("/login");
      }
    };

    // subscription data
    const subscription=''
    // folers 
    const folder=''
  return (
    <>
      <div>Sidebar</div>
      <Button onClick={logout}>LOGOUT</Button>
    </>
  );
}

export default Sidebar