import React from "react";
import { getServerSideUser } from "@/lib/token-utils";
import { cookies } from "next/headers";
import Link from "next/link";
const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
    const nextCookies = cookies();
    const user  = await getServerSideUser(nextCookies);
    if (user) {
        return (
          <main>
            {children}
          </main>
        );
    }else{
        return <main>LOGIN TO CONTINUE <Link href={'/login'}>LOGIN</Link> </main>;
    }
};

export default DashBoardLayout;
