"use client";

import { useEffect } from "react";
import { usePostsStore } from "@/app/Context/postStore";

interface ProfilePostsClientProps {
    posts: any[];
}

const ProfilePostsClient: React.FC<ProfilePostsClientProps> = ({ posts }) => {
    const setProfilePosts = usePostsStore((state) => state.setProfilePosts);

    useEffect(() => {
        if (posts && posts.length > 0) {
            setProfilePosts(posts);
        }
    }, [posts, setProfilePosts]);

    return null; // This component doesn't render anything
};

export default ProfilePostsClient;
