import { create } from "zustand";

type postStore = {
    posts: any[];
    setPosts: (newPosts: any[]) => void;
};

export const usePostsStore = create<postStore>((set) => ({
    posts: [],
    setPosts: (newPosts: any[]) => {
        set((state) => ({ posts: [...state.posts, ...newPosts] }));
    }
}));
