import { Toaster } from "sonner";
const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default AuthPageLayout;
