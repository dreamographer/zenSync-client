import { User } from "@/Types/userInterface";
import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
import { Workspace } from "@/Types/workspaceType";
import { Folder } from "@/Types/folderType";
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
  workspace: Workspace[] | [];
  setWorkspace: (workspace: Workspace[] | null | Workspace) => void;
};

export const useWorkspaceStore = create<workspaceState>(
  persistNSync(
    set => ({
      workspace: [], 
      setWorkspace: workspace => {
      set(state => {
        if (Array.isArray(workspace)) {
          const newFolders = workspace.filter(
            f =>
              !state.workspace.some(
                existingFolder => existingFolder.id === f.id
              )
          );
          return {
            workspace: [...state.workspace, ...newFolders],
          };
        } else if (workspace !== null) {
          if (
            !state.workspace.some(
              existingFolder => existingFolder.id === workspace.id
            )
          ) {
            return {
              workspace: [...state.workspace, workspace],
          };
          }
        }
        return state;
      });
      },
    }),
    { name: "workspaceInfo", storage: "localStorage" }
  )
);


type FolderState = {
  folder: Folder[];
  setFolder: (folder: Folder | Folder[]|null) => void;
};

export const useFolderStore = create<FolderState>(

    set => ({
      folder: [],
      setFolder: folder => {
        set(state => {
          if (Array.isArray(folder)) {
            const newFolders = folder.filter(
              f =>
                !state.folder.some(existingFolder => existingFolder.id === f.id)
            );
            return {
              folder: [...state.folder, ...newFolders],
            };
          } else if (folder !== null) {

            if (
              !state.folder.some(
                existingFolder => existingFolder.id === folder.id
              )
            ) {
              return {
                folder: [...state.folder, folder],
              };
            }
          }
          return state; 
        });
      },
    }),
  
);