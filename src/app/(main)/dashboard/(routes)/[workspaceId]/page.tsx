 'use client'
 import React from 'react'
import { useUserStore, useWorkspaceStore } from "@/store/store";
 const WorkspacePage = () => {
    const user = useUserStore(state => state.user);
   return (
     <div>WorkspacePage of {user?.fullname}</div>
   )
 }
 
 export default WorkspacePage