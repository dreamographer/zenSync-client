"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoDark from "../../../../public/logo-black/zensync-horizontal.png";
import LogoLight from "../../../../public/Logo-white/zenSync-horizontal.png";
import GithubLight from "../../../../public/other/github.png";
import GithubDark from "../../../../public/other/githubDark.png";
import Google from "../../../../public/other/google.png";
import Link from "next/link";
import Saly from "../../../../public/other/Saly-14.png";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
const handleSignIn = () => {
  signIn("google");
};
const formSchema = z
  .object({
    fullname: z.string().min(2, "Full name must have at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(
        8,
        "Password must have at least 8 characters with alphanumber combination"
      )
      .refine(password => /[A-Za-z][0-9]/.test(password), {
        message: "Password must contain at least one letter",
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const LoginPage = () => {
  const {register,handleSubmit,formState:{errors}} = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values);
  }
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach(error => {
        if (error && error.message) {
          toast.error(error.message,{position:"top-left"});
        }
      });
    }
  }, [errors]);
  if (!mounted) {
    return null;
  }
  const Logo = theme === "light" ? LogoLight : LogoDark;
  const Github = theme === "light" ? GithubLight : GithubDark;

  return (
    <section className="sm:flex justify-center sm:fixed h-screen  sm:overflow-hidden w-full">
      <div
        className="w-[30%]
        blur-[100px]
        rounded-full
        h-40
        absolute
        dark:bg-brand/brand-PrimaryPurple
        dark:bg-brand/brand-
        -z-10
        -bottom-10
        -left-36"
      />
      <div className="sm:w-1/2 sm:text-center gap-5 flex flex-col  sm:justify-center sm:items-center p-5">
        <Image className="mb-2 w-52  sm:w-80 " src={Logo} alt="ZensyncLogo" />
        <div className="text-2xl font-light">
          <p>SignUP to</p>
          <p>Experience ZenSync</p>
        </div>
        <p>
          If you already have an account {}
          <Link href={"/login"}>
            <span className="font-bold text-Washed-blue/washed-blue-500">
              Login here!
            </span>{" "}
          </Link>
        </p>
      </div>
      <div className="sm:w-1/2 text-center flex flex-col justify-center items-center">
        <h2 className="md:text-5xl mb-5 text-3xl font-light">Sign Up</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sm:space-y-3 space-y-2 sm:w-2/3 w-3/4"
        >
          <div className="text-left">
            <Label htmlFor="fullname">FullName</Label>
            <Input
              {...register("fullname")}
              className={cn(
                { "focus-visible:ring-red-500": errors.fullname },
                "sm:h-14"
              )}
              placeholder="Enter Your fullname"
            />
          </div>

          <div className="text-left">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              type="text"
              className={cn(
                { "focus-visible:ring-red-500": errors.email },
                "sm:h-14"
              )}
              placeholder="Enter Your Email"
            />
          </div>
          <div className="text-left">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              type="password"
              className={cn(
                { "focus-visible:ring-red-500": errors.password },
                "sm:h-14"
              )}
              placeholder="Password"
            />
          </div>
          <div className="text-left">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              className={cn(
                { "focus-visible:ring-red-500": errors.confirmPassword },
                "sm:h-14"
              )}
              placeholder="Confirm password"
            />
          </div>

          <Button
            type="submit"
            className="w-full sm:h-14 bg-brand/brand-PrimaryPurple/70 backdrop-blur-sm text-white hover:bg-brand/brand-PrimaryPurple"
          >
            Signup
          </Button>
        </form>
        <div className="md:mt-3">
          <p>Or continue with</p>
          <div className="flex gap-4 mt-3">
            <Image onClick={handleSignIn} src={Google} alt="Google" />
            <Image src={Github} alt="GitHUb" />
          </div>
        </div>
      </div>
      <Image
        src={Saly}
        alt="Saly"
        className="hidden lg:block -z-50 absolute -bottom-10 "
      />
    </section>
  );
};

export default LoginPage;
