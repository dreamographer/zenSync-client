import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";
import { User } from "@/Types/userInterface";
export const getServerSideUser = async (
  token: string ,
  refresh: string 
) => {
  try {
    console.log("server tokebn",refresh);
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token} Refresh ${refresh}`,
        },
        credentials: "include",
        //  cache: 'force-cache'
      }
    );
      
    if (!response.ok) {
      if (response.status === 403) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const user = data as { user: User | null };
   
    return { user };
  } catch (error) {
    console.log("An unexpected error occurred:", error);
  }
}; 
