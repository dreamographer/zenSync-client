 'use client'

import useDashboardData from '@/hooks/useDashboardData';
import useRealtimeFolderUpdates from '@/hooks/useFolderUpdate';
 const WorkspacePage = () => {
  useDashboardData();
  useRealtimeFolderUpdates()
   return (
     <div>
      Select a FIle
     </div>
   );
 }

 export default WorkspacePage