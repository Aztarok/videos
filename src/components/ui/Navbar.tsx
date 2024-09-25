"use client";
import { useAppContext } from "@/app/Context/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { BsPeople } from "react-icons/bs";
import { FaFeatherAlt, FaRegBookmark } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { PiDotsThreeCircle } from "react-icons/pi";
import { TbBell } from "react-icons/tb";
import Profile from "./Profile";
import { Button } from "./button";

const buttonData = [
    {
        href: "/",
        icon: <GoHomeFill className="text-[30px] font-bold" />,
        label: "Home"
    },
    {
        icon: <IoIosSearch className="text-[30px] font-bold" />,
        label: "Explore"
    },
    {
        icon: <TbBell className="text-[30px] font-bold" />,
        label: "Notifications"
    },
    {
        icon: <HiOutlineMail className="text-[30px] font-bold" />,
        label: "Messages"
    },
    {
        icon: <FaRegBookmark className="text-[30px] font-bold" />,
        label: "Bookmarks"
    },
    {
        icon: <BsPeople className="text-[30px] font-bold" />,
        label: "Communities"
    },
    {
        icon: <FaXTwitter className="text-[30px] font-bold" />,
        label: "Premium"
    },
    {
        href: (state: any) => `/profile/${state?.handle}`,
        icon: <IoPerson className="text-[30px] font-bold" />,
        label: "Profile"
    },
    {
        icon: <PiDotsThreeCircle className="text-[30px] font-bold" />,
        label: "More"
    }
];

const Navbar = () => {
    const { state } = useAppContext();
    const handleClick = () => {
        if (state) {
            document.getElementById("upload-post")?.click();
        }
    };

    const requestUrl = usePathname();

    return (
        <>
            {requestUrl !== "/auth" && requestUrl !== "/somepage" && (
                <div className="sticky top-0  md:w-[13.5%] lg:w-[13.5%] xl:w-[26%] 2xl:w-[36%] h-screen">
                    <div className="relative flex flex-col items-end gap-1.5">
                        <div className="w-[72px] xl:w-[259px] h-screen flex flex-col gap-6 relative">
                            <div className="flex items-center">
                                <Button
                                    className="rounded-full py-[25px] px-[10px]"
                                    variant="ghost"
                                >
                                    <FaXTwitter className="w-[30px] h-[30px]" />
                                </Button>
                            </div>
                            {buttonData.map(({ href, icon, label }, index) => {
                                const ButtonContent = (
                                    <Button
                                        key={index}
                                        className="gap-3 pl-2 pr-2 xl:pr-7 xl:py-6 rounded-full"
                                        variant="ghost"
                                    >
                                        {icon}
                                        <h1 className="text-xl font-normal hidden xl:block">
                                            {label}
                                        </h1>
                                    </Button>
                                );

                                return href ? (
                                    <Link
                                        key={index}
                                        href={
                                            typeof href === "function"
                                                ? href(state)
                                                : href
                                        }
                                    >
                                        {ButtonContent}
                                    </Link>
                                ) : (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        {ButtonContent}
                                    </div>
                                );
                            })}
                            <div className="mt-2 flex items-center">
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
            )}
        </>
    );
};

export default Navbar;
