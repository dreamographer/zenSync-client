"use client";
import React from "react";
import { redirect } from "next/navigation";
import {  useUserStore, useWorkspaceStore } from "@/store/store";
import DashboardSetup from "@/components/dashboard/dashboardSetup";
const Dashboard = () => {
  const user = useUserStore(state => state.user);
  const workspace = useWorkspaceStore(state => state.workspace);
  if (!user) {
    return null;
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
