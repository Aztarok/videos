import { create } from "zustand";
import { produce } from "immer";
import { Post } from "@/lib/types/custom";

type layoutStore = {
    layout: boolean;
    setLayout: () => void;
};

export const useLayoutStore = create<layoutStore>((set) => ({
    layout: false,
    setLayout: () => {
        set((state) => ({ layout: !state.layout }));
    }
}));
