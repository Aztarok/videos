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
import { PiDotsThreeCircle } from "react-icons/pi";
import Profile from "./Profile";
import { supabaseServer } from "@/lib/supabase/server";
const Navbar = () => {
    // const supabase = supabaseServer();
    // const { data } = await supabase.auth.getSession();
    // if (data.session?.user.id) {
    //     const { data: user } = await supabase
    //         .from("profiles")
    //         .select("*")
    //         .eq("id", data.session.user.id)
    //         .single();
    //     console.log(user);
    // }

    return (
        <div className="md:w-[23.5%] lg:w-[28%] xl:w-[35.75%] h-screen ">
            <div className="fixed md:w-[23.5%] lg:w-[28%] xl:w-[35.75%] h-screen">
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
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] flex items-center ">
                        <Button
                            className="gap-3 pl-2 pr-7 py-6 rounded-full"
                            variant="ghost"
                        >
                            <GoHomeFill className="text-[30px] font-bold " />
                            <h1 className="text-xl font-normal">Home</h1>
                        </Button>
                    </div>
                    <div className="w-[259px] h-[58px] mt-2 flex items-center ">
                        <Button
                            className="text-white font-bold text-[16px] py-6 w-[90%] rounded-full"
                            variant="default"
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
