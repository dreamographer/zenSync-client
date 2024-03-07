"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Workspace } from "@/Types/workspaceType";
import { User } from "@/Types/userInterface";
import { useUserStore, useWorkspaceStore } from "@/store/store";

// Define the types for the setter functions if needed
const useDashboardData = () => {
  const setUser = useUserStore(state => state.setUser);
  const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
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
        setUser(userData);
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
        const workspaceData = await response.json();

        if (!workspaceData.message && !workspaceData.error) {
          setWorkspace(workspaceData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
    fetchWorkspaceData();
  }, [setUser, setWorkspace]);
};

export default useDashboardData;
