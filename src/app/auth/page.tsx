"use client";

import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { KeyRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Page = ({ searchParams }: { searchParams: any }) => {
    const next = searchParams.next;

    const handleLoginWithOAuth = (provider: "github" | "google") => {
        const supabase = supabaseBrowser();
        supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: next
                    ? `${location.origin}/auth/callback?next=${next}`
                    : `${location.origin}/auth/callback`
            }
        });
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="w-96 rounded-md border p-5 space-y-5 relative bg-slate-900">
                <div className="flex items-center gap-2 text-white">
                    <KeyRound />
                    <h1 className="text-2xl font-bold">Next + Supabase</h1>
                </div>
                <p className="text-sm text-gray-300">
                    Register/Sign in Today 👇
                </p>

                <div className="flex flex-col gap-5">
                    <Button
                        className="w-full flex items-center gap-2"
                        variant="outline"
                        onClick={() => handleLoginWithOAuth("github")}
                    >
                        <FaGithub /> Github
                    </Button>
                    <Button
                        className="w-full flex items-center gap-2"
                        variant="outline"
                        onClick={() => handleLoginWithOAuth("google")}
                    >
                        <FcGoogle /> Google
                    </Button>
                </div>
                <div className="glowBox -z-10"></div>
            </div>
        </div>
    );
};

export default Page;
