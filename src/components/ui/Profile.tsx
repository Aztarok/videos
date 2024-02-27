"use client";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import useUser from "@/app/hook/useUser";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { adminAuthClient } from "@/app/api/Admin";

export default function Profile({
    fade = true,
    imageNew
}: {
    fade?: boolean;
    imageNew?: string;
}) {
    const { isFetching, data } = useUser();
    const queryClient = useQueryClient();
    const router = useRouter();

    const pathname = usePathname();

    if (isFetching) {
        return <>Loading...</>;
    }

    const handleLogout = async () => {
        const supabase = supabaseBrowser();
        queryClient.clear();
        await supabase.auth.signOut();
        router.refresh();
        if (protectedPaths.includes(pathname)) {
            router.replace("/auth?next=" + pathname);
        }
    };

    let imageUrl;
    if (imageNew) {
        imageUrl = imageNew;
    } else {
        imageUrl = data?.image_url;
    }
    const profileCheck = pathname.substring(0, pathname.indexOf("/", 1));
    return (
        <div className="items-center flex overflow-x-hidden">
            {!data?.id ? (
                <Link href="/auth" className=" animate-fade">
                    <Button variant="outline">SignIn</Button>
                </Link>
            ) : (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                        <>
                            {data?.image_url ? (
                                <div className="w-[50px]">
                                    <Image
                                        src={imageUrl || ""}
                                        alt={data.display_name || ""}
                                        width={50}
                                        height={50}
                                        priority={true}
                                        className={`${
                                            fade ? "animate-fade" : ""
                                        } rounded-full focus:border-none ring-2 cursor-pointer`}
                                    />
                                </div>
                            ) : (
                                <div className="h-[50px] w-[50px] flex items-center justify-center ring-2 rounded-full text-2xl font-bold cursor-pointer">
                                    <h1>{data.email[0]}</h1>
                                </div>
                            )}
                        </>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white" />

                        <DropdownMenuItem onClick={handleLogout}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}
