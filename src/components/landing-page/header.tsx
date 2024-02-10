"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LogoDark from "../../../public/logo-black/zensync-horizontal.png";
import LogoLight from "../../../public/Logo-white/zenSync-horizontal.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const routes = [
  { title: "Home", href: "#features" },
  { title: "Pricing", href: "#features" },
  { title: "About", href: "#features" },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Header = () => {
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
        <Link href={'/'}>Home</Link>
        <Link href={'/'}>Pricing</Link>
        <Link href={'/'}>About</Link>
     </div>
      <aside className="flex w-full gap-2 justify-end">
        <ThemeSwitcher />
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
      </aside>
    </header>
  );
};

export default Header;
