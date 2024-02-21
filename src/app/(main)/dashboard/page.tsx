"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { clearStorage } from "persist-and-sync";
import { useStore } from "@/store/store";
import { useCookies } from "next-client-cookies";
import DashboardSetup from "@/components/dashboard/dashboardSetup";
const Dashboard = () => {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const workspace = false; //workspace of the user
  // subscription DAta
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/users/me`,
          {
            credentials: "include",
            // cache: 'force-cache'
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
      
        
        setUser(userData); // Set the user data in the store
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  const router = useRouter();
  const logout = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
      {
        withCredentials: true,
      }
    );
    if (response) {
      clearStorage("userInfo", "localStorage");
      setUser(null);
      router.replace("/login");
    }
  };
    if (!user) {
      return; //no user
    }
  if (!workspace) {
    return(
      <div className="w-full h-screen flex justify-center items-center">

        <DashboardSetup subscription={""} user={user} />
      </div>
    )
  }else{
    return (
      <div
        className="bg-background 
      h-screen
       w-screen
        flex 
        justify-center
         items-center "
      >
        WELCOME {user?.fullname}
        <Button onClick={logout}>LOGOUT</Button>
      </div>
    );
  }
  // redirect(`/dashboard/`); //id of the workdspace
};

export default Dashboard;
