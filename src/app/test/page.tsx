import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <div className=" dark:bg-neutral-800 flex-col overflow-y-auto relative flex w-60">
        <Skeleton className="w-52 self-center mt-5  h-[40px] bg-neutral-500 rounded " />
        <Skeleton className="w-44 self-start  mt-5  h-[25px] bg-neutral-500 rounded " />
        <Skeleton className="w-32 self-start  mt-5  h-[25px] bg-neutral-500 rounded " />
        <Skeleton className="w-32 ml-5  mt-3  h-[18px] bg-neutral-500  " />
        <Skeleton className="w-32 ml-9  mt-3  h-[18px] bg-neutral-500  " />
        <Skeleton className="w-32 ml-9  mt-3  h-[18px] bg-neutral-500  " />
        <Skeleton className="w-32 ml-5  mt-3  h-[18px] bg-neutral-500  " />
        <Skeleton className="w-32 ml-9  mt-3  h-[18px] bg-neutral-500  " />
        <Skeleton className="w-32 ml-9  mt-3  h-[18px] bg-neutral-500  " />
        <div className="mt-auto mb-5 flex justify-center gap-3">
        <Skeleton className="w-10 self-center place-self-end h-10 bg-neutral-500 rounded-full " />
        <Skeleton className="w-44 self-center place-self-end h-[40px] bg-neutral-500 rounded " />
        </div>
      </div>
    </div>
  );
};

export default loading;
