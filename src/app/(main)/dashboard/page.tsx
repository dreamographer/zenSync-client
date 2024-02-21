"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { clearStorage } from "persist-and-sync";
import { useUserStore, useWorkspaceStore } from "@/store/store";
import { useCookies } from "next-client-cookies";
import DashboardSetup from "@/components/dashboard/dashboardSetup";
const Dashboard = () => {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const workspace = useWorkspaceStore(state => state.workspace); 
  const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
    // const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
  // subscription DAta
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/users/me`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await response.json();
        console.log("The User",userData);
        

        setUser(userData); // Set the user data in the store
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchWorkspaceData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/workspace`,
          {
            credentials: "include",
          }
        );
        const workSpace=await response.json()
        setWorkspace(workSpace)
      }
       catch (error) {}
    };
    fetchUserData();
    fetchWorkspaceData();
  }, []);
  const router = useRouter();
    if (!user) {
      return
    }
  if (!workspace) {
    return(
      <div className="w-full h-screen flex justify-center items-center">
        <DashboardSetup subscription={""} user={user} />
      </div>
    )
  }else{
  redirect(`/dashboard/${workspace.id}`)
  } 
};

export default Dashboard;
