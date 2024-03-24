"use client";

import { ChevronsLeftRight, UserRound } from "lucide-react";


import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUserStore, useWorkspaceStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Logout from "../global/Logout";
import { ThemeSwitcher } from "../global/ThemeSwitcher";

export const UserItem = () => {

  const user = useUserStore(state => state.user);

  return (
    <div className="flex flex-col space-y-4 p-2">
      <p className="text-xs font-medium leading-none text-muted-foreground">
        {user?.email}
      </p>
      <div className="flex items-center gap-x-2">
        <div className="rounded-full  bg-slate-50 p-1">
          <Avatar className="h-8 w-8 flex justify-center items-center ">
            {user?.profile ? (
              <AvatarImage src={user?.profile as string} />
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="6" r="4" fill="#1C274C" />
                <ellipse
                  opacity="0.5"
                  cx="12"
                  cy="17"
                  rx="7"
                  ry="4"
                  fill="#1C274C"
                />
              </svg>
            )}
          </Avatar>
        </div>
        <div className="space-y-1">
          <p className="text-sm line-clamp-1">
            {user?.fullname}&apos;s ZenSYnc
          </p>
        </div>
        <ThemeSwitcher />
        <Logout />
      </div>
    </div>
  );
};
