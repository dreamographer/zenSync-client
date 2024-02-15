import { Toaster } from "sonner";
const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster richColors />
      {children}
    </>
  );
};

export default AuthPageLayout;
