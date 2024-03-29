import { Skeleton } from "@/components/ui/skeleton";
import { useFileStore, useFolderStore } from "@/store/store";
interface TitleProps {
  initialData: {
    title: string;
    id: string;
    folderId: string;
  };
}
export const Title = ({ initialData }: TitleProps) => {
  const Folders = useFolderStore(state => state.folder);
  const files = useFileStore(state => state.files);
  
  const Folder = Folders.find(ele => ele.id == initialData.folderId);
  const file = files.get(Folder?.id as string)?.find(ele => ele.id == initialData.id);
  return (
    <div className="flex w-fit  items-center gap-x-1">
      <span className="cursor-default truncate">
        {Folder?.title}/{file?.title}
      </span>
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
