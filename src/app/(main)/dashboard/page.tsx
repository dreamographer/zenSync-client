"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useStore } from "../../../store/store";
const Dashboard = () => {
    const setStore= useStore(state => state.setUser);
  const router = useRouter();
  const logout = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
      {
        withCredentials: true,
      }
    );
    if (response) {
      setStore(null)
      router.replace("/login");
      
    }
  };
  return (
    <div>
      Dashboard
      <Button onClick={logout}>LOGOUT</Button>
    </div>
  );
};

export default Dashboard;
