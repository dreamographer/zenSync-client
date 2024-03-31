import dynamic from "next/dynamic";
import React from "react";
import { getServerSideUser } from "@/lib/token-utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const VideoRoomToggle = dynamic(
    () => import("@/components/global/VideoRoomToggle"),
    {
      ssr: false,
    }
  );
  const nextCookies = cookies();
  const token = nextCookies.get("jwt")?.value;
  const refreshToken = nextCookies.get("refreshToken")?.value;
  console.log("Token and refresh Tokern", token, refreshToken);
  const user = await getServerSideUser();
  if (token && refreshToken) {
    if (user) {
      return(<>
        <VideoRoomToggle />
        {children}
      </>);
    } else {
      redirect("/");
    }
  } else {
    return (
      <main>
        LOGIN TO CONTINUE <Link href={"/login"}>LOGIN</Link>{" "}
      </main>
    );
  }
};

export default MainLayout;
