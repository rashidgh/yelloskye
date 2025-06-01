"use client";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem("token");
    signOut(auth);
    router.push("/sign-in");
  };

  return (
    <div className="flex h-[60px] w-full bg-[#000000] rounded-b-4xl items-center text-white gap-[20px] justify-around sticky top-0 z-20">
      <div className="w-[15%]">
        <Link href="/" className="text-xl font-bold">
          Yello skye
        </Link>
      </div>

      <div className="w-[50%]"></div>

      <div
        className=" flex justify-center items-center cursor-pointer"
        onClick={logOut}
      >
        <FaRegUserCircle className="text-3xl" />
        <span className="ml-2 text-slate-200 font-semibold">Logout</span>
      </div>
    </div>
  );
};

export default Navbar;
