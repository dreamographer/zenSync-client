"use client";

import { ChevronsLeft, MenuIcon, Settings as SetUp, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useFolderStore, useUserStore, useWorkspaceStore } from "@/store/store";
import { UserItem } from "./user-item";
import { Item } from "./item";
import { DocumentList } from "./documentList";
import WorkspaceDropdown from "./workspace-dropDown";
import { Workspace } from "@/Types/workspaceType";
import Settings from "../settings/settings";
import { Navbar } from "./navbar";
import useRealtimeFolderUpdates from "@/hooks/useFolderUpdate";
import { TrashBox } from "./trashBox";
import PresentationRoomToggle from "./PresentationRoomToggle";
import DriverJs from "@/lib/providers/DriverjsProvider";
export const Navigation = () => {
  const user = useUserStore(state => state.user);

  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const router = useRouter();
  const setFolder = useFolderStore(state => state.setFolder);
  const Folders = useFolderStore(state => state.folder);
  let workspaceId = params?.workspaceId as string;
  let allWorkspaces = useWorkspaceStore(state => state.workspace);
  let workspace = allWorkspaces?.find(ele => ele?.id == workspaceId);
  let privateWorkspaces = allWorkspaces?.filter(
    ele => ele?.workspaceType == "private" 
  );
  let sharedWorkspaces = allWorkspaces?.filter(
    ele => ele.workspaceType == "shared"
  );
  useRealtimeFolderUpdates();

  useEffect(() => {
    workspace = allWorkspaces?.find(ele => ele.id == workspaceId);
    privateWorkspaces = allWorkspaces?.filter(
      ele => ele.workspaceType == "private"
    );
    sharedWorkspaces = allWorkspaces?.filter(
      ele => ele.workspaceType == "shared"
    );
  }, [workspaceId, allWorkspaces]);

  useEffect(() => {
    if (!allWorkspaces.find(ele => ele.id == workspaceId)) {
      console.log("invalide workspcaer");
      router.replace(`/dashboard`);
      return;
    }
    const fetchFolderData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/folder/${workspaceId}`,
          {
            credentials: "include",
          }
        );
        const Folders = await response.json();

        if (!Folders.message) {
          setFolder(Folders);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFolderData();
  }, [workspaceId]);

  useEffect(() => {
    router.replace(`/dashboard/${workspaceId}`);
  }, [workspaceId]);
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
    

      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar z-50 h-full dark:bg-neutral-800 bg-slate-100 overflow-y-auto relative flex w-60 flex-col ",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 z-50 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6 " />
        </div>
        <div id="workspace" className="h-12 relative w-full">
          <WorkspaceDropdown
            close={collapse}
            defaultValue={workspace as Workspace}
            privateWorkspaces={privateWorkspaces as Workspace[]}
            sharedWorkspaces={sharedWorkspaces as Workspace[]}
          />
        </div>
        {workspace?.workspaceOwner == user?.id && (
          <div onClick={collapse}>
            <div className="settings">
              <Settings>
                <Item label="Settings" icon={SetUp} />
              </Settings>
            </div>
          </div>
        )}
        <div className="mt-4">
          <DocumentList workspaceId={workspaceId} />

          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className=" group-hover/sidebar:opacity-100 opacity-0 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
        <div className="mt-auto  ">
          <div className="hidden md:block">
            <PresentationRoomToggle />
          </div>
          <UserItem />
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.fileId ? (
          <Navbar
            documentId={params.fileId as string}
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
