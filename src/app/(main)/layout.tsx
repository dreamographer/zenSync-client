import "server-only";
import React from "react";
import { getServerSideUser } from "@/lib/token-utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { Toaster } from "sonner";
const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const nextCookies = cookies();
  const token = nextCookies.get("jwt")?.value;
  if (token) {
    const user = await getServerSideUser(token);
    console.log("The user", user);

    if (user) {
      return (
        <main>
          <Toaster richColors />
          {children}
        </main>
      );
    } else {
      return (
        <main>
          USER Authenticaiton Failed Please <Link href={"/login"}>LOGIN</Link>{" "}
        </main>
      );
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
