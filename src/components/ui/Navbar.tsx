"use client";
import { useAppContext } from "@/app/Context/store";
import Link from "next/link";
import { Suspense } from "react";
import { BsPeople } from "react-icons/bs";
import { FaRegBookmark, FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { PiDotsThreeCircle } from "react-icons/pi";
import { TbBell } from "react-icons/tb";
import Profile from "./Profile";
import { Button } from "./button";
import { FaFeatherAlt } from "react-icons/fa";
const Navbar = () => {
    const { state, setState } = useAppContext();
    const handleClick = () => {
        if (state) {
            document.getElementById("upload-post")?.click();
        }
    };

    return (
        <div className="md:w-[13.5%] lg:w-[13.5%] xl:w-[26%] 2xl:w-[30.7%] h-screen">
            <div className="fixed md:w-[13.5%] lg:w-[13.5%] xl:w-[26%] 2xl:w-[30.7%] h-screen">
                <div className="flex flex-col items-end gap-1.5">
                    <div className="w-[72px] xl:w-[259px] h-screen flex flex-col gap-2 relative">
                        <div className=" flex items-center">
                            <Button
                                className="rounded-full py-[25px] px-[10px]"
                                variant="ghost"
                            >
                                <FaXTwitter className="w-[30px] h-[30px]" />
                            </Button>
                        </div>
                        <div className="flex items-center ">
                            <Link href="/">
                                <Button
                                    className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                    variant="ghost"
                                >
                                    <GoHomeFill className="text-[30px] font-bold" />
                                    <h1 className="text-xl font-normal hidden xl:block">
                                        Home
                                    </h1>
                                </Button>
                            </Link>
                        </div>
                        <div className=" flex items-center ">
                            <Button
                                className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                variant="ghost"
                            >
                                <IoIosSearch className="text-[30px] font-bold " />
                                <h1 className="text-xl font-normal hidden xl:block">
                                    Explore
                                </h1>
                            </Button>
                        </div>
                        <div className=" flex items-center ">
                            <Button
                                className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                variant="ghost"
                            >
                                <TbBell className="text-[30px] font-bold " />
                                <h1 className="text-xl font-normal hidden xl:block">
                                    Notifications
                                </h1>
                            </Button>
                        </div>
                        <div className=" flex items-center ">
                            <Button
                                className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                variant="ghost"
                            >
                                <HiOutlineMail className="text-[30px] font-bold " />
                                <h1 className="text-xl font-normal hidden xl:block">
                                    Messages
                                </h1>
                            </Button>
                        </div>
                        <div className=" flex items-center ">
                            <Button
                                className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                variant="ghost"
                            >
                                <FaRegBookmark className="text-[30px] font-bold " />
                                <h1 className="text-xl font-normal hidden xl:block">
                                    Bookmarks
                                </h1>
                            </Button>
                        </div>
                        <div className=" flex items-center ">
                            <Button
                                className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                variant="ghost"
                            >
                                <BsPeople className="text-[30px] font-bold " />
                                <h1 className="text-xl font-normal hidden xl:block">
                                    Communities
                                </h1>
                            </Button>
                        </div>
                        <div className=" flex items-center ">
                            <Button
                                className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                variant="ghost"
                            >
                                <FaXTwitter className="text-[30px] font-bold " />
                                <h1 className="text-xl font-normal hidden xl:block">
                                    Premium
                                </h1>
                            </Button>
                        </div>
                        <div className=" flex items-center ">
                            <Link href={`/profile/${state?.handle}`}>
                                <Button
                                    className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                    variant="ghost"
                                >
                                    <IoPerson className="text-[30px] font-bold " />
                                    <h1 className="text-xl font-normal hidden xl:block">
                                        Profile
                                    </h1>
                                </Button>
                            </Link>
                        </div>
                        <div className=" flex items-center ">
                            <Button
                                className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                variant="ghost"
                            >
                                <PiDotsThreeCircle className="text-[30px] font-bold " />
                                <h1 className="text-xl font-normal hidden xl:block">
                                    More
                                </h1>
                            </Button>
                        </div>
                        <div className=" mt-2 flex items-center ">
                            <Button
                                className="text-white font-bold text-[16px] py-6 w-[50px] xl:w-[90%] rounded-full"
                                variant="default"
                                onClick={handleClick}
                            >
                                <h1 className="hidden xl:block">Post</h1>
                                <FaFeatherAlt className="text-xl font-normal block xl:hidden" />
                            </Button>
                        </div>
                        <div className="absolute flex items-center bottom-4 w-full">
                            <Suspense>
                                <Profile />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
