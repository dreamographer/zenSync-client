"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LogoDark from "../../../public/logo-black/zensync-horizontal.png";
import LogoLight from "../../../public/Logo-white/zenSync-horizontal.png";
import { useStore } from "../../store/store";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";




const Header = () => {
  const user = useStore(state => state.user);
  const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
    if (!mounted) {
      return null;
    }
  const Logo = theme === "light" ? LogoLight : LogoDark;
  return (
    <header className=" flex justify-center h-16 items-center sticky  backdrop-blur-sm z-40 top-0 w-full px-5">
      <Link
        className="w-full flex
      justify-start items-center"
        href={"/"}
      >
        <Image src={Logo} width={160} alt="zensync"></Image>
      </Link>
      <div className="md:flex gap-6 hidden  border px-20 rounded-full outline outline-brand/brand-Dark dark:outline-Washed-purple/washed-purple-50 outline-[.1px] py-1">
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Pricing</Link>
        <Link href={"/"}>About</Link>
      </div>
      <aside className="flex w-full gap-2 justify-end">
        <ThemeSwitcher />
        {!user ? (
          <div className="flex gap-3">
            <Link href={"/login"}>
              <Button variant={"ghost"} className="p-1">
                Login
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button variant={"default"} className="whitespace-nowrap ">
                SignUp
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link href={"/dashboard"}>
              <Button variant={"ghost"} className="p-1">
                Dashboard
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </header>
  );
};

export default Header;
