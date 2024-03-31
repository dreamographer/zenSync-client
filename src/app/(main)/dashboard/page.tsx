"use client";
import React, { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import {  useUserStore, useWorkspaceStore } from "@/store/store";
import DashboardSetup from "@/components/dashboard/dashboardSetup";
import { Loader } from "lucide-react";
const Dashboard = () => {
  const user = useUserStore(state => state.user);
  const workspace = useWorkspaceStore(state => state.workspace);
  const [loading, isLoading] = useState(true);
  // const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
  // subscription DAta
console.log("hello");

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
      } finally {
        isLoading(false);
      }
    };

    fetchUserData();
    fetchWorkspaceData();
    if (!user) {
      redirect(`/login`);
    }
  }, []);

  if (!user) {
    return null;
  }
  if (loading) {
    <Loader />
  }

  if (workspace.length == 0 || !workspace[0].id ) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <DashboardSetup subscription={""} user={user} />
      </div>
    );
  } else {
    if (workspace[0].id) {
      redirect(`/dashboard/${workspace[0].id}`);
    }
  }
};

export default Dashboard;
