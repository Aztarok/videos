"use client";

import { useEffect } from "react";
import { usePostsStore } from "@/app/Context/postStore";

interface ProfilePostsClientProps {
    posts: any[];
    profileId: string;
}

const ProfilePostsClient: React.FC<ProfilePostsClientProps> = ({
    posts,
    profileId
}) => {
    const setProfilePosts = usePostsStore((state) => state.setProfilePosts);
    const setCurrentProfileId = usePostsStore(
        (state) => state.setCurrentProfileId
    );

    useEffect(() => {
        if (posts && posts.length > 0) {
            setProfilePosts(posts);
            setCurrentProfileId(profileId);
        }
    }, [posts, setProfilePosts, setCurrentProfileId, profileId]);

    return null; // This component doesn't render anything
};

export default ProfilePostsClient;
