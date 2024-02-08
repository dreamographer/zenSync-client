"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image"; 
export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        setMounted(true);

    }, []);


    if (!mounted) {
        return null;
    }

    return (
        <button
            className={`w-fit absolute right-5 top-2  rounded-md hover:scale-110 p-2 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "light" ? <Image src="/Vector (Stroke).png" width={30} height={30} alt="LOGO" /> : <Image src="/Sun_duotone.png" width={40} height={500} alt="LOGO" />}
        </button>
    );
};