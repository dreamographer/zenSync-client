import { User } from "@/app/Types/userType";
import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
import { Workspace } from "@/app/Types/workspaceType";
type userState = {
  user: User | null;
  expiry: string | null;
  setUser: (user: User | null, expiryMinutes?: number) => void;
};

export const useUserStore = create<userState>(
  persistNSync(
    set => ({
      user: null,
      expiry: null,
      setUser: (user, expiryMinutes = 24 * 60) => {
        const expiry = new Date(
          Date.now() + expiryMinutes * 60 * 1000
        ).toISOString();
        set({ user, expiry });
      },
    }),
    { name: "userInfo", storage: "localStorage" }
  )
);


type workspaceState = {
  workspace: Workspace | null;
  setWorkspace: (workspace: Workspace|null) => void;
};

export const useWorkspaceStore = create<workspaceState>(
  persistNSync(
    set => ({
      workspace: null, 
      setWorkspace: workspace => {
        set({ workspace });
      },
    }),
    { name: "workspaceInfo", storage: "localStorage" }
  )
);

