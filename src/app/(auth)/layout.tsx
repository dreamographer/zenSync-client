"use client";
import { Toaster } from "sonner";
import { useUserStore, useWorkspaceStore } from '@/store/store';
import { useRouter } from "next/navigation";
import { clearStorage } from "persist-and-sync";
const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, expiry, setUser } = useUserStore();
  const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
  if (user && expiry && new Date() > new Date(expiry)) {
    clearStorage("userInfo", "localStorage");
    clearStorage("workspaceInfo", "localStorage");
    setUser(null);
    setWorkspace(null)
  }
  
  if (!user) {
    return (
      <>
        <Toaster richColors />
        {children}
      </>
    );
  } else {
    router.replace('/dashboard')
    return null
  }
};

export default AuthPageLayout;
