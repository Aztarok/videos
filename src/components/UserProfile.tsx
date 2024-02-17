import { supabaseServer } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default async function Profile({
    fade = true,
    imageNew,
    user_id
}: {
    fade?: boolean;
    imageNew?: string;
    user_id: string;
}) {
    const supabase = supabaseServer();
    const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user_id)
        .single();

    const imageUrl = imageNew || data?.image_url;

    return (
        <div>
            {data?.id ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <>
                            {data?.image_url ? (
                                <Image
                                    src={data.image_url || ""}
                                    alt={data.display_name || ""}
                                    width={50}
                                    height={50}
                                    className={`${
                                        fade ? "animate-fade" : ""
                                    } rounded-full focus:border-none ring-2 cursor-pointer`}
                                />
                            ) : (
                                <div className="h-[50px] w-[50px] flex items-center justify-center ring-2 rounded-full text-2xl font-bold cursor-pointer">
                                    <h1>{data?.email[0]}</h1>
                                </div>
                            )}
                        </>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{`@${data.display_name}`}</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white" />
                        <DropdownMenuItem asChild>
                            <Link href={`/profile/${data.display_name}`}>
                                Profile
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                ""
            )}
        </div>
    );
}
