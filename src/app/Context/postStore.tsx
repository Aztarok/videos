import { create } from "zustand";
import { produce } from "immer";
import { Post } from "@/lib/types/custom";

type postStore = {
    posts: any[];
    setPosts: (newPosts: any[]) => void;
    addPost: (newPost: any) => void;
    followingPosts: any[];
    setFollowingPosts: (newFollowingPosts: any[]) => void;
    profilePosts: any[];
    setProfilePosts: (newProfilePosts: any[]) => void;
    currentProfileId: string | null;
    setCurrentProfileId: (id: string | null) => void;
};

export const usePostsStore = create<postStore>((set) => ({
    posts: [],
    setPosts: (newPosts: any[]) => {
        set((state) => ({ posts: [...state.posts, ...newPosts] }));
    },
    addPost: (newPost: any) => {
        set((state) => ({ posts: [newPost, ...state.posts] }));
    },
    followingPosts: [],
    setFollowingPosts: (newFollowingPosts: any[]) => {
        set((state) => ({
            followingPosts: [...newFollowingPosts]
        }));
    },
    profilePosts: [],
    setProfilePosts: (newProfilePosts: any[]) => {
        set((state) => ({
            profilePosts: [...newProfilePosts]
        }));
    },
    currentProfileId: null,
    setCurrentProfileId: (id: string | null) => {
        set((state) => ({
            currentProfileId: id
        }));
    }
}));
