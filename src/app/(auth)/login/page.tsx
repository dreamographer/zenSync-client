"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import LogoDark from "../../../../public/logo-black/zensync-horizontal.png";
import LogoLight from "../../../../public/Logo-white/zenSync-horizontal.png";
import GithubLight from "../../../../public/other/github.png";
import GithubDark from "../../../../public/other/githubDark.png";
import Google from "../../../../public/other/google.png";
import axios from "axios";
import Link from "next/link";
import Saly from "../../../../public/other/Saly-14.png"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { useStore } from "../../../store/store";
import { formSchema } from "@/app/Types/Schema";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const handleGoogleSignIn = () => {
  window.open(`${BASE_URL}/auth/google/callback`, "_self");
};
const handleGithubSignIn = () => {
  window.open(`${BASE_URL}/auth/github/callback`, "_self");
};

const LoginPage = () => {
  const router = useRouter();
  const setUser = useStore(state => state.setUser);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:''
    },
  });

  async  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      
      const response = await axios.post(`${BASE_URL}/auth/login`, values, {
        withCredentials: true,
      });
      console.log(response.data.user);
      const user = {
        id: response.data.user.id,
      fullname: response.data.user.fullname,
      email: response.data.user.email,
      profile: response.data.user.profile??null,
      verified: response.data.user.verified,
      };
      
      console.log("user",user);
      
      if (response) {
        toast.success("Login successful!", {
          position:"top-center"
        });
        setTimeout(() => {
          setUser(user)
        }, 1000);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
      
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.error, { position: "top-left" });
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  }
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
    if (!mounted) {
      return null;
    }
    const Logo = theme === "light" ? LogoLight : LogoDark;
      const Github = theme === "light" ? GithubLight : GithubDark;


  return (
    <section className="sm:flex justify-center fixed h-screen  overflow-hidden w-full">
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
        <Link href={"/"}>
          <Image className="mb-2 w-52  sm:w-80 " src={Logo} alt="ZensyncLogo" />
        </Link>
        <div className="text-2xl font-light">
          <p>Sign in to</p>
          <p>Your Workspace</p>
        </div>
        <p>
          If you don't have an account {}
          <Link href={"/signup"}>
            <span className="font-bold text-Washed-blue/washed-blue-500">
              Register here!
            </span>{" "}
          </Link>
        </p>
      </div>
      <div className="sm:w-1/2 text-center flex flex-col justify-center items-center">
        <h2 className="md:text-5xl mb-5 text-3xl font-light">Sign In</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 sm:w-2/3 w-3/4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-brand/brand-PrimaryPurple/70 backdrop-blur-sm text-white hover:bg-brand/brand-PrimaryPurple"
            >
              Login
            </Button>
            <div className="md:mt-3 ">
              <p>Or continue with</p>
              <div className="flex gap-4 mt-3 justify-center">
                <Image
                  onClick={handleGoogleSignIn}
                  src={Google}
                  alt="Google"
                  className="cursor-pointer w-9 h-9"
                />
                <Image
                  onClick={handleGithubSignIn}
                  src={Github}
                  alt="GitHUb"
                  className="cursor-pointer w-9 h-9"
                />
              </div>
            </div>
          </form>
        </Form>
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
