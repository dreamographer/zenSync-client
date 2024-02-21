import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";
import { User } from "@/app/Types/userType";
export const getServerSideUser = async (
  token: string 
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        //  cache: 'force-cache' 
      },
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
