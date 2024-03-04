"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image"; 
export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    
    
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return ( 
        <button
            className={` rounded-md hover:scale-110 active:scale-100 duration-200`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "light" ? <Image src="/Vector (Stroke).png" width={30} height={20} alt="ThemeSwitch" /> : <Image src="/Sun_duotone.png" width={30} height={30} alt="ThemeSwitch" />}
        </button>
    );
};