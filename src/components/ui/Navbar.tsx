"use client";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { Button } from "./button";
import { IoIosSearch } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { TbBell } from "react-icons/tb";
import { FaRegBell } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { BsSlashSquare } from "react-icons/bs";
import { RiFileListLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa6";
import { Suspense, useEffect, useRef, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { PiDotsThreeCircle } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import Profile from "./Profile";
import { supabaseServer } from "@/lib/supabase/server";
import Link from "next/link";
import { useAppContext } from "@/app/Context/store";
const Navbar = () => {
    const { state, setState } = useAppContext();
    const handleClick = () => {
        if (true) {
            console.log(state);
            // document.getElementById("upload-post")?.click();
        }
    };
    return (
        <div className="md:w-[23.5%] lg:w-[28%] xl:w-[35.75%] 2xl:w-[30.7%] h-screen ">
            <div className="fixed md:w-[23.5%] lg:w-[28%] xl:w-[35.75%] 2xl:w-[30.7%] h-screen">
                <div className="flex flex-col items-end gap-1.5">
                    <div className="w-[259px] h-[58px] flex items-center">
                        <Button
                            className="rounded-full py-[25px] px-[10px]"
                            variant="ghost"
                        >
                            <FaXTwitter className="w-[30px] h-[30px]" />
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Link href="/">
                            <Button
                                className="gap-3 pl-2 pr-7 py-6 rounded-full"
                                variant="ghost"
                            >
                                <GoHomeFill className="text-[30px] font-bold " />
                                <h1 className="text-xl font-normal">Home</h1>
                            </Button>
                        </Link>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <IoIosSearch className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Explore</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <TbBell className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">
                                Notifications
                            </h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <HiOutlineMail className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Messages</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <FaRegBookmark className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Bookmarks</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <BsPeople className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Communities</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <FaXTwitter className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Premium</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <IoPerson className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Profile</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <PiDotsThreeCircle className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">More</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] mt-2 flex items-center ">
                        <Button
                            className="text-white font-bold text-[16px] py-6 w-[90%] rounded-full"
                            variant="default"
                            onClick={handleClick}
                        >
                            Post
                        </Button>
                    </div>
                    <div className="absolute flex items-center  bottom-4 w-[259px] h-[58px]">
                        <Suspense>
                            <Profile />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
