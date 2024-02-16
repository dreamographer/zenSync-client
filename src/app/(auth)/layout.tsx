"use client";
import { Toaster } from "sonner";
import { useStore } from '@/store/store';
import { useRouter } from "next/navigation";
const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useStore(state => state.user);
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
