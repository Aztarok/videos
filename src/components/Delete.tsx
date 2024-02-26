"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Delete = ({ post_name }: { post_name: string }) => {
    const router = useRouter();
    const supabase = supabaseBrowser();
    const handleDelete = async () => {
        for (let i = 0; i < post_name.length; i++) {
            const image = post_name[i];
            const { error } = await supabase.storage
                .from("postImages")
                .remove([image]);
        }
        router.refresh();
    };
    return (
        <>
            <Button
                className="place-self-end self-start absolute z-10"
                onClick={handleDelete}
            >
                Delete
            </Button>
        </>
    );
};

export default Delete;
