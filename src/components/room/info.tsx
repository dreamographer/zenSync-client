"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { TooltipComponent } from "../global/tool-tip";
import { Button } from "@/components/ui/button";
;

interface InfoProps {
  boardId: string;
}

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Info = ({ boardId }: InfoProps) => {
  const data = {title:"Dummy"};  //get the workspace name

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <TooltipComponent message="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/dashboard">
            <Image
              src="/logo-black/zenSync-onlyLogo.png"
              alt="Board logo"
              height={40}
              width={40}
            />
            <span className={cn("font-semibold text-xl ml-2 text-black")}>
              Meeting Room
            </span>
          </Link>
        </Button>
      </TooltipComponent>
      <TabSeparator />
      <Button variant="board" className="text-base font-normal px-2">
        {data.title}
      </Button>

    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
