export type File = {
  id: string;
  title: string;
  workspaceId: string;
  inTrash: boolean;
  folderId: string;
  coverImage?: string;
  isPublished?: boolean;
  content?:string;
};
