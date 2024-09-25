"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProfileProps {
    profile?: {
        display_name?: string;
        handle?: string;
        image_url?: string;
    };
    fade?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ profile, fade = true }) => {
    if (!profile) {
        return null; // or return a placeholder component
    }

    const { display_name = "", handle = "", image_url = "" } = profile;

    return (
        <div className="flex items-center space-x-2">
            {image_url ? (
                <Image
                    src={image_url}
                    alt={display_name || "Profile"}
                    width={50}
                    height={50}
                    className={cn(`${fade ? "animate-fade" : ""} rounded-full`)}
                />
            ) : (
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-300 text-xl font-bold">
                    {handle ? handle.charAt(0).toUpperCase() : "U"}
                </div>
            )}
            <div>
                <h2 className="text-lg font-semibold">
                    {display_name || "Unknown"}
                </h2>
                <p className="text-sm text-gray-500">@{handle || "unknown"}</p>
            </div>
        </div>
    );
};

export default Profile;
