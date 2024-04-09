"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useUserStore, useWorkspaceStore } from "@/store/store";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const VideoRoomToggle = dynamic(
    () => import("@/components/global/VideoRoomToggle"),
    {
      ssr: false,
    }
  );
  const setUser = useUserStore(state => state.setUser);
  const user = useUserStore(state => state.user);
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
      } finally {
        setLoading(false);
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
    if (!user) {
      redirect(`/login`);
    }
  }, []);

  if (loading) {
    return (
      <>
        <div className="w-full h-full grid place-items-center">
          <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
        </div>
      </>
    );
  }
  if (!user && !loading) {
    return (
      <main>
        LOGIN TO CONTINUE <Link href={"/login"}>LOGIN Now</Link>{" "}
      </main>
    );
  } else {
    return (
      <>
        <VideoRoomToggle />
        {children}
      </>
    );
  }
};

export default MainLayout;
