import { useFolderStore } from '@/store/store';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useFolderUpdates = () => {
    const updateFolder=useFolderStore(state => state.setFolder);
 useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
    socket.on('folderCreated', (folder) => {
      console.log('New folder created:', folder);
      updateFolder(folder);
    });

    return () => {
      socket.disconnect();
    };
 }, []);
};

export default useFolderUpdates;