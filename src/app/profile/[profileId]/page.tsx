import { supabaseServer } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { Suspense } from "react";
import FollowOrEdit from "./components/FollowOrEdit";
import RouterBack from "./components/RouterBack";
import FetchMore from "@/components/Posts/FetchMore";
import Profile from "@/components/ui/Profile";
import { usePostsStore } from "@/app/Context/postStore";
import ProfilePostsClient from "./components/ProfilePostsClient";

const Page = async () => {
    let profilePath;
    const headersList = headers();
    const header_url = headersList.get("x-url") || "";
    const pathname = headersList.get("x-pathname");
    const origin_url = headersList.get("x-origin");
    const followme = headersList.get("followingBruh");
    const followsyou = headersList.get("followersBruh");
    if (!followme || !followsyou) {
        throw Error("Headers not found, try refreshing the page");
    }
    const followme2 = new Set(JSON.parse(followme!));
    const followsyou2 = new Set(JSON.parse(followsyou!));

    const supabase = supabaseServer();
    let numPosts: number;
    if (!pathname || !origin_url || !header_url) {
        throw Error;
    }
    profilePath = decodeURI(pathname.substring(pathname.indexOf("/", 2) + 1));

    const { data: userData } = await supabase
        .from("profiles")
        .select("*,posts(*)")
        .eq("handle", profilePath)
        .single();
    // const { data: numPost } = await supabase
    // 	.from('posts')
    // 	.select('*', { count: 'exact' })
    // 	.eq('post_by', userData?.id);
    numPosts = Number(userData?.posts.length);

    return (
        <div className="relative bg-slate-950 text-white">
            <div className="w-full h-[253px] flex flex-col">
                <div className="w-full h-[53px] flex items-center border-[1px] border-slate-400 border-t-0">
                    <RouterBack />

                    <div className="flex flex-col ml-5">
                        <h1 className="font-bold text-xl">{profilePath}</h1>
                        {numPosts !== undefined && (
                            <h1 className="text-xs text-gray-400 font-semibold">
                                {numPosts} posts
                            </h1>
                        )}
                    </div>
                </div>
                <div className="w-full bg-gray-600 border-[1px] border-slate-400 border-t-0 flex-1"></div>
            </div>
            <div className=""></div>
            <div className="w-full h-auto border-x-[1px] border-slate-400">
                <div className="w-full h-[310px] flex flex-col relative">
                    <div className="absolute pl-3 pt-3">
                        {userData &&
                            userData.display_name &&
                            userData.handle &&
                            userData.image_url && (
                                <Profile
                                    profile={{
                                        display_name:
                                            userData.display_name || "Image",
                                        handle: userData.handle || "Image",
                                        image_url: userData.image_url || "Image"
                                    }}
                                />
                            )}
                    </div>
                    <Suspense>
                        <FollowOrEdit
                            userCheck={profilePath}
                            userData={userData}
                            followersTotal={followsyou2}
                            followingTotal={followme2}
                        />
                    </Suspense>
                    {/* Pass the fetched posts to the client component */}
                    {userData && userData.id && (
                        <ProfilePostsClient
                            posts={userData?.posts || []}
                            profileId={userData.id}
                        />
                    )}
                </div>
                <div className="w-full h-[53px] border-b-[1px] border-slate-400"></div>
            </div>
            <div>
                <FetchMore />
            </div>
        </div>
    );
};

export default Page;
