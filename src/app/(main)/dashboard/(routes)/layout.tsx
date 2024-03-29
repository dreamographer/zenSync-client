import React from "react";
import { getServerSideUser } from "@/lib/token-utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { Navigation } from "@/components/dashboard/Naviagation";
import { redirect } from "next/navigation";
import { CoverImageModal } from "@/components/dashboard/cover-image-modal";
const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const nextCookies = cookies();
  const token = nextCookies.get("jwt")?.value;
  if (token) {
    const user = await getServerSideUser(token);
    if (user) {
      return (
        <div className="h-full flex w-full fixed dark:bg-[#1F1F1F]">

          <CoverImageModal />
          <Navigation />
          <main className="h-full flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      );
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

export default DashBoardLayout;
