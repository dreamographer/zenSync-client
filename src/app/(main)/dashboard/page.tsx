"use client";
import React, { useEffect, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import { useFolderStore, useUserStore, useWorkspaceStore } from "@/store/store";
import DashboardSetup from "@/components/dashboard/dashboardSetup";
import useDashboardData from "@/hooks/useDashboardData";
const Dashboard = () => {
  const user = useUserStore(state => state.user);
  const workspace = useWorkspaceStore(state => state.workspace);
  // const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
  // subscription DAta
  
useDashboardData()

if (!user) {
  redirect(`/login`);
}
  if (!user) {
    return;
  }

  if (workspace.length == 0 || !workspace[0].id) {
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
