'use client'

import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <>
            {theme === 'dark' && (<Sun onClick={() => setTheme('light')} size={20}/>)}
            {theme === 'light' && (<Moon onClick={() => setTheme('dark')} size={20}/>)}
        </>
    );
};

export default ThemeToggle;