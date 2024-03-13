import { Room } from "@/components/room/room";

import { Canvas } from "@/components/room/canvas";
import { Loading } from "@/components/room/loading";

interface BoardIdPageProps {
  params: {
    workspaceId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={params.workspaceId} fallback={<Loading />}>
      <Canvas boardId={params.workspaceId} />
    </Room>
  );
};

export default BoardIdPage;
