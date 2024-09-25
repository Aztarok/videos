import { create } from "zustand";
import { produce } from "immer";
import { Post } from "@/lib/types/custom";

type postStore = {
    posts: any[];
    setPosts: (newPosts: any[]) => void;
    followingPosts: any[];
    setFollowingPosts: (newFollowingPosts: any[]) => void;
    profilePosts: any[];
    setProfilePosts: (newProfilePosts: any[]) => void;
};

export const usePostsStore = create<postStore>((set) => ({
    posts: [],
    setPosts: (newPosts: any[]) => {
        set((state) => ({ posts: [...state.posts, ...newPosts] }));
    },
    followingPosts: [],
    setFollowingPosts: (newFollowingPosts: any[]) => {
        set((state) => ({
            followingPosts: [...newFollowingPosts]
        }));
    },
    // Add profilePosts state and setter
    profilePosts: [],
    setProfilePosts: (newProfilePosts: any[]) => {
        set((state) => ({
            profilePosts: [...newProfilePosts]
        }));
    }
}));
