import { create } from "zustand";
import { produce } from "immer";
import { Post } from "@/lib/types/custom";

type postStore = {
    posts: Post[];
    setPosts: (newPosts: Post[]) => void;
    followingPosts: Post[];
    setFollowingPosts: (newFollowingPosts: Post[]) => void;
};

export const usePostsStore = create<postStore>((set) => ({
    posts: [],
    setPosts: (newPosts: Post[]) => {
        set((state) => ({ posts: [...state.posts, ...newPosts] }));
    },
    followingPosts: [],
    setFollowingPosts: (newFollowingPosts: Post[]) => {
        set((state) => ({
            followingPosts: [...state.followingPosts, ...newFollowingPosts]
        }));
    }
    // immer example
    // setFollowingPosts: (newFollowingPosts: Post[]) => {
    //     set(
    //         produce((state) => {
    //             state.followingPosts = newFollowingPosts;
    //         })
    //     );
    // }
}));
