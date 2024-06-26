 'use client'
import Logo from "../../../../../../public/logo-black/zenSync-onlyLogo.png";
import Image from "next/image";
import useDashboardData from '@/hooks/useDashboardData';
import useRealtimeFolderUpdates from '@/hooks/useFolderUpdate';

 const WorkspacePage = () => {
  useDashboardData();
  useRealtimeFolderUpdates();

   return (
     <div className="w-full page-header h-full flex justify-center items-center">
       <Image className="mb-2" src={Logo} alt="ZensyncLogo" width={70} />
     </div>
   );
 }

 export default WorkspacePage