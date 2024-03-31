"use client"
import dynamic from "next/dynamic";
import React from "react";
import useSWR from "swr";
import Link from "next/link";
import axios from "axios";
const fetcher = (url:string) =>
axios.get(url, { withCredentials: true }).then(res => res.data);
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const url= `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/users/me`
  const VideoRoomToggle = dynamic(
    () => import("@/components/global/VideoRoomToggle"),
    {
      ssr: false,
    }
  );
   const { data: user, error } = useSWR(url, fetcher);

  console.log(user);
  
  if (user) {
      return (
        <>
          <VideoRoomToggle />
          {children}
        </>
      );
  } else {
    return (
      <main>
        LOGIN TO CONTINUE <Link href={"/login"}>LOGIN Now</Link>{" "}
      </main>
    );
  }
};

export default MainLayout;
