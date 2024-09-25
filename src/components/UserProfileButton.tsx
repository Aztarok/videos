"use client";
import { CustomUser } from "@/lib/types/custom";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { getAuthed } from "@/app/Context/store";
import { useQueryClient } from "@tanstack/react-query";
import authCheck from "@/app/actions";

const UserProfileButton = ({ data, fade }: { data: any; fade: boolean }) => {
    const pathname = usePathname();
    if (data) {
    }
    // const queryString = new URLSearchParams({
    //     userId: data.id,
    //     display: data.display_name || "",
    //     timeMade: data.created_at,
    //     email: data.email || "",
    //     imageUrl: data.image_url || ""
    // }).toString();
    const profileCheck = pathname.substring(0, pathname.indexOf("/", 1));
    const router = useRouter();
    const queryClient = useQueryClient();
    const handleClick = async () => {
        queryClient.clear();
        router.refresh();
    };
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none">
                <>
                    {data?.image_url ? (
                        <Image
                            src={data.image_url || ""}
                            alt={data.display_name || ""}
                            width={50}
                            height={50}
                            className={`${
                                fade ? "animate-fade" : ""
                            } rounded-full focus:border-none cursor-pointer outline-none`}
                        />
                    ) : (
                        <div className="h-[50px] w-[50px] flex items-center justify-center rounded-full text-2xl font-bold cursor-pointer">
                            <h1>{data?.handle && data.handle[0]}</h1>
                        </div>
                    )}
                </>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{`@${data.display_name}`}</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-300">
                    <h1 className="text-white">0 Followers</h1>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white" />
                <DropdownMenuItem asChild>
                    <Link
                        onClick={handleClick}
                        href={`${
                            profileCheck === "/profile"
                                ? data.handle
                                : `profile/${data.handle}`
                        }`}
                        className="cursor-pointer hover:bg-blue-300"
                    >
                        Profile
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfileButton;
