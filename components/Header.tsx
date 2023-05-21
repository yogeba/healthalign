import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface HeaderProps {
  cartId: string | null;
}

const Header: React.FC<HeaderProps> = ({ cartId }) => {
  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/mortar.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          Health Align
        </h1>
      </Link>

      <div className="nav__btns">
        {cartId && (
          <Link href={`/cart/${cartId}`} passHref>
            <Image
              alt="Cart"
              src="/hospital-supplies.png"
              className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
              width={32}
              height={28}
            />
          </Link>
        )}
        <Link href="/about" target="_blank" rel="noopener noreferrer">
          <Image
            alt="About"
            src="/team.png"
            className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
            width={32}
            height={28}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
