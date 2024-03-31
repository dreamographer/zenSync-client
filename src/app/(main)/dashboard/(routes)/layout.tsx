import React from "react";
import { Navigation } from "@/components/dashboard/Naviagation";
import { CoverImageModal } from "@/components/dashboard/cover-image-modal";
const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex w-full fixed dark:bg-[#1F1F1F]">
      <CoverImageModal />
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashBoardLayout;
