import { Room } from "@/components/room/room";

import { Canvas } from "@/components/room/canvas";
import { Loading } from "@/components/room/loading";

interface BoardIdPageProps {
  params: {
    roomId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={params.roomId} fallback={<Loading />}>
      <Canvas boardId={params.roomId} />
    </Room>
  );
};

export default BoardIdPage;
