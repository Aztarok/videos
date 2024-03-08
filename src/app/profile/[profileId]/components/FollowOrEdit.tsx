"use client";
import { useAppContext } from "@/app/Context/store";

import useFollowers from "@/app/hook/getFollowers";
import useFollowing from "@/app/hook/getFollowing";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
interface FollowData {
    follower_id: string;
    following_id: string;
}

const FollowOrEdit = ({
    userCheck,
    userData,
    mine
}: {
    userCheck?: string;
    userData: any;
    mine: any;
}) => {
    const router = useRouter();
    const { state } = useAppContext();
    const supabase = supabaseBrowser();
    let edit = false;
    if (userCheck === state?.display_name) {
        edit = true;
    }
    const [followersDataNum, setFollowersDataNum] = useState(0);
    const [mineNum, setMineNum] = useState(0);
    const [followingNum, setFollowingNum] = useState(0);
    const [followed, setFollowed] = useState(false);

    const { data: followersData } = useFollowers({ userWho: userData });
    const { data: followingData } = useFollowing({ userWho: userData });

    let displayFollows = false;
    if (state?.id === userData.id) {
        displayFollows = true;
    }

    const editProfile = () => {
        router.refresh();
    };
    const getNums = async () => {
        console.log(userData.id);
        const { data, count } = await supabase
            .from("Follows")
            .select("*")
            .in("following_id", [userData.id]);
        console.log(data);
        console.log(count);
    };
    const follow = async () => {
        // if (followed) {
        // 	console.log('Already following this user');
        // 	return;
        // }

        // const { data, error } = await supabase
        // 	.from('Follows')
        // 	.insert({ follower_id: state.id, following_id: userData.id });
        // followed = true;
        // if (followersDataNum > 0) {
        // 	setFollowersDataNum(followersDataNum + 1);
        // }
        // router.refresh();
        try {
            // Optimistic update
            setFollowersDataNum(
                (prevFollowersDataNum) => prevFollowersDataNum + 1
            );

            // Perform API call
            await supabase
                .from("Follows")
                .insert({ follower_id: state.id, following_id: userData.id });

            setFollowed(true);
        } catch (error) {
            // Revert the state back if the API call fails
            setFollowersDataNum(
                (prevFollowersDataNum) => prevFollowersDataNum - 1
            );
            console.error("Failed to follow user:", error);
        }
    };

    const unfollow = async () => {
        // const { data, error } = await supabase
        // 	.from('Follows')
        // 	.delete()
        // 	.eq('follower_id', state.id)
        // 	.eq('following_id', userData.id);
        // followed = false;
        // if (followersDataNum > 0) {
        // 	setFollowersDataNum(followersDataNum - 1);
        // }
        // router.refresh();
        try {
            // Optimistic update
            setFollowersDataNum(
                (prevFollowersDataNum) => prevFollowersDataNum - 1
            );

            // Perform API call
            await supabase
                .from("Follows")
                .delete()
                .eq("follower_id", state.id)
                .eq("following_id", userData.id);

            setFollowed(false);
        } catch (error) {
            // Revert the state back if the API call fails
            setFollowersDataNum(
                (prevFollowersDataNum) => prevFollowersDataNum + 1
            );
            console.error("Failed to unfollow user:", error);
        }
    };

    useEffect(() => {
        if (Array.isArray(followersData)) {
            const following = new Set(followingData);
            setFollowersDataNum(followersData.length);
            setFollowingNum(following.size);
            setMineNum(mine.size);
        }
        if (mine.has(userData.id)) {
            setFollowed(true);
        }
    }, [followersData, followingData, mine]);

    return (
        <>
            <div className="w-full h-[68px] flex justify-end gap-2 pt-2">
                {edit ? (
                    <>
                        <Button
                            className="bg-gray-600 mr-5 rounded-full px-5"
                            variant="ghost2"
                            onClick={editProfile}
                        >
                            <h1 className="text-md font-bold">Edit Profile</h1>
                        </Button>
                        <Button
                            className="bg-gray-600 mr-5 rounded-full px-5"
                            variant="ghost2"
                            onClick={getNums}
                        >
                            <h1 className="text-md font-bold">Edit Profile</h1>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            className="rounded-full relative border-[1px] border-slate-400 w-10 h-10 text-lg"
                            variant="none"
                        >
                            <HiMiniEllipsisHorizontal className="absolute" />
                        </Button>
                        {followed ? (
                            <>
                                <Button
                                    onClick={unfollow}
                                    className="bg-gray-600 mr-5 rounded-full px-5"
                                    variant="ghost2"
                                >
                                    <h1 className="text-md font-bold">
                                        Unfollow
                                    </h1>
                                </Button>
                                <Button
                                    onClick={getNums}
                                    className="bg-gray-600 mr-5 rounded-full px-5"
                                    variant="ghost2"
                                >
                                    <h1 className="text-md font-bold">
                                        Unfollow
                                    </h1>
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={follow}
                                className="bg-gray-600 mr-5 rounded-full px-5"
                                variant="ghost2"
                            >
                                <h1 className="text-md font-bold">Follow</h1>
                            </Button>
                        )}
                    </>
                )}
            </div>
            <div className="p-4 relative h-full">
                <div>{userData?.display_name}</div>
                <div>{`@${userData?.display_name}`}</div>
                <div className="w-full flex gap-5 absolute bottom-0">
                    <div>
                        {displayFollows ? (
                            <div>{<div>{`${mineNum} Following`}</div>}</div>
                        ) : (
                            <div>
                                {<div>{`${followingNum} Following`}</div>}
                            </div>
                        )}
                    </div>
                    <div>{<div>{`${followersDataNum!} Followers`}</div>}</div>
                </div>
            </div>
        </>
    );
};

export default FollowOrEdit;
