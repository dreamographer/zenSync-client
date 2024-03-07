 'use client'

import useDashboardData from '@/hooks/useDashboardData';
import useFileUpdate from '@/hooks/useFileUpdate';
import useRealtimeFolderUpdates from '@/hooks/useFolderUpdate';
import useWorkspaceUpdate from '@/hooks/useWorkspaceUpdate';
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