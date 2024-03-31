import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";
import { User } from "@/Types/userInterface";
import axios from "axios";
export const getServerSideUser = async () => {
  try {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/users/me`,
    {
      withCredentials: true, 
    }
  );

      
    if (!response.status) {
      if (response.status === 403) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.data;
    const user = data as { user: User | null };
   
    return { user };
  } catch (error) {
    console.log("An unexpected error occurred:", error);
  }
}; 
