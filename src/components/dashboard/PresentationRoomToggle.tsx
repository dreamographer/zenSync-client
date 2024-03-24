import { Presentation } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

const PresentationRoomToggle = () => {
  const params=useParams()
  const router=useRouter()
  const onClick=()=>{
    router.push(`/room/${params.workspaceId}`);
  }
  return (
    <div onClick={onClick} className="p-3 cursor-pointer border rounded-xl mx-2 dark:bg-gray-700  flex gap-3  ">
      <Presentation />
      <p>Meeting Room</p>
    </div>
  );
}

export default PresentationRoomToggle;