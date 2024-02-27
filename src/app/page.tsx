import Delete from "@/components/Delete";
import FetchPosts from "@/components/Posts/FetchPosts";
import UserProfile from "@/components/UserProfile";
import { supabaseServer } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { Suspense } from "react";

const Page = async () => {
    return (
        <div>
            <FetchPosts />
        </div>
    );
};

export default Page;
