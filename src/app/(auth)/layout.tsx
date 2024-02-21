"use client";
import { Toaster } from "sonner";
import { useStore } from '@/store/store';
import { useRouter } from "next/navigation";
import { clearStorage } from "persist-and-sync";
const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, expiry, setUser } = useStore();
  if (user && expiry && new Date() > new Date(expiry)) {
    clearStorage("userInfo", "localStorage");
    setUser(null);
  }
  console.log(expiry);
  
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
