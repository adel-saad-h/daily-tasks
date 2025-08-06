"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Add task", href: "/addTask" },
  { label: "Today tasks", href: "/todayTasks" },
  { label: "Average", href: "/average" },
];

const navItem = () => {
  return (
    <nav>
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={
            "font-bold rounded-lg px-3 py-3  hover:bg-gray-300 hover:text-gray-900"
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-6 lg:px-8">
      <Link href={"/"}>
        <div>
          <Image src={"./icon180.svg"} alt="logo" width={46} height={44} />
        </div>
      </Link>
      <div>{navItem()}</div>
    </nav>
  );
};

export default NavBar;
