import { Skeleton } from "@/components/ui/skeleton";
import { useFileStore, useFolderStore } from "@/store/store";
import { useParams } from "next/navigation";
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
  const file = files.find(ele => ele.id == initialData.id);
  return (
    <div className="flex items-center gap-x-1">
      {/* {!!initialData.icon && <p>{initialData.icon}</p>} */}
      <span className="cursor-default truncate">
        {Folder?.title}/{file?.title}
      </span>
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
