import { User } from "@/Types/userInterface";
import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
import { Workspace } from "@/Types/workspaceType";
import { Folder } from "@/Types/folderType";
import { File } from "@/Types/fileType";
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
  updateWS: (updatedWS: Workspace) => void;
  deleteWS: (deleteWS: Workspace) => void;
};

export const useWorkspaceStore = create<workspaceState>(set => ({
  workspace: [],
  setWorkspace: workspace => {
    set(state => {
      if (Array.isArray(workspace)) {
        const newFolders = workspace.filter(
          f =>
            !state.workspace.some(existingFolder => existingFolder.id === f.id)
        );
        return {
          workspace: [...state.workspace, ...newFolders],
        };
      } else if (workspace) {
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
  updateWS: updatedWS =>
    set(state => ({
      workspace: state.workspace.map(workspace =>
        workspace.id === updatedWS.id ? updatedWS : workspace
      ),
    })),
  deleteWS: deleteWS =>
    set(state => ({
      workspace: state.workspace.filter(
        workspace => workspace.id !== deleteWS.id
      ),
    })),
}));

type FolderState = {
  folder: Folder[];
  setFolder: (folder: Folder | Folder[] | null) => void;
  deleteFolder: (folderId: string) => void;
};

export const useFolderStore = create<FolderState>(set => ({
  folder: [],
  setFolder: folder => {
    set(state => {
      if (Array.isArray(folder)) {
        const newFolders = folder.filter(
          f => !state.folder.some(existingFolder => existingFolder.id === f.id)
        );
        return {
          folder: [...state.folder, ...newFolders],
        };
      } else if (folder !== null) {
        const existingFolderIndex = state.folder.findIndex(
          existingFolder => existingFolder.id === folder.id
        );
        if (existingFolderIndex !== -1) {
          const updatedFolder = {
            ...state.folder[existingFolderIndex],
            ...folder,
          };
          const updatedFolders = state.folder.map((f, index) =>
            index === existingFolderIndex ? updatedFolder : f
          );
          return {
            folder: updatedFolders,
          };
        } else if (folder) {
          return {
            folder: [...state.folder, folder],
          };
        }
      }
      return state;
    });
  },
  deleteFolder: folderId => {
    set(state => {
      if (state.folder.length === 1) {
        return { folder: [] };
      } else {
        const updatedFolders = state.folder.filter(
          folder => folder.id !== folderId
        );

        return { folder: updatedFolders };
      }
    });
  },
}));

interface FilesState {
  files: File[];
  setFiles: (newFiles: File | null | File[]) => void;
  updateFile: (updatedFile: File) => void;
}

export const useFileStore = create<FilesState>(set => ({
  files: [],
  setFiles: newFile => {
    set(state => {
      if (Array.isArray(newFile)) {
        const newFiles = newFile.filter(
          f => !state.files.some(existingFile => existingFile.id === f.id)
        );
        return {
          files: [...state.files, ...newFiles],
        };
      } else if (newFile !== null) {
        if (newFile) {
          return {
            files: [...state.files, newFile],
          };
        }
      }
      return state;
    });
  },
  updateFile: updatedFile =>
    set(state => ({
      files: state.files.map(file =>
        file.id === updatedFile.id ? updatedFile : file
      ),
    })),
}));
