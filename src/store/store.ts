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
  files: Map<string, File[]>;
  setFiles: (newFiles: { folderId: string; files: File[] } | null) => void;
  updateFile: (updatedFile: File) => void;
}

export const useFileStore = create<FilesState>(set => ({
  files: new Map(),
  setFiles: newFileData => {
    if (newFileData) {
      const { folderId, files } = newFileData;
      set(state => {
        if (state.files.get(folderId)) {
          state.files.set(folderId, [
            ...(state.files.get(folderId) || []),
            ...files.filter(file => {
              const existingFiles = state.files.get(folderId) || [];
              return !existingFiles.some(
                existingFile => existingFile.id === file.id
              );
            }),
          ]);
        } else {
          state.files.set(
            folderId,
            files.filter(file => {
              const existingFiles = state.files.get(folderId) || [];
              return !existingFiles.some(
                existingFile => existingFile.id === file.id
              );
            })
          );
        }
        return { ...state }; // Spread operator for immutability
      });
    } else {
      set(state => ({ ...state })); // Reset to empty state if data is null
    }
  },
  updateFile: updatedFile =>
    set(state => ({
      files: new Map(
        Array.from(state.files.entries()).map(([folderId, files]) => [
          folderId,
          files.map(file => (file.id === updatedFile.id ? updatedFile : file)),
        ])
      ),
    })),
}));
