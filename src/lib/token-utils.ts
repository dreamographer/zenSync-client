import axios from "axios";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";
interface User {
  id?: string;
  fullname: string;
  email: string; 
  password: string;
  profile?: string;
  verify_token?: string;
  verified?: boolean;
}

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
    try {
        const token = cookies.get("jwt")?.value;

        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = data as { user: User | null };

        return { user };
    } catch (error) {
          if (axios.isAxiosError(error) && error.response?.data) {
              if(error.response.status==403){
                return  null
              }
            
          } else {
            console.log("An unexpected error occurred:", error);
          }
        
    }
  
};
