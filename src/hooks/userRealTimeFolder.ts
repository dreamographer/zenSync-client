import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useRealtimeFolderUpdates = () => {
 useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
    socket.on('folderCreated', (folder) => {
      console.log('New folder created:', folder);
      //update the state
    });

    return () => {
      socket.disconnect();
    };
 }, []);
};

export default useRealtimeFolderUpdates;