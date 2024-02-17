"use client";

import { generateVideoThumbnailViaUrl } from "@/index";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const FetchThumbnail = ({
    post_by,
    video_id,
    video_name
}: {
    post_by: string;
    video_id: string;
    video_name: string;
}) => {
    const router = useRouter();
    const [thumbnails, setThumbnails] = useState<string[]>([]);
    const wasAlreadyRequested = useRef(false);
    const thumbGenRef = useRef<HTMLDivElement>(null);
    const baseUrl =
        "https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/";
    const vid = `${baseUrl}${post_by}/${video_id}/${video_name}`;

    const generateAndSaveThumbnail = async (vid: string) => {
        try {
            const result = await generateVideoThumbnailViaUrl(vid, 0.5);
            wasAlreadyRequested.current = true;
            if (result) {
                localStorage.setItem(video_id, JSON.stringify([result]));
                setThumbnails([result]);
            }
        } catch (error) {
            console.error("Error generating thumbnail:", error);
        }
    };
    useEffect(() => {
        const storedThumbnails = localStorage.getItem(video_id);
        const handleBeforeUnload = () => {
            localStorage.clear();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        if (storedThumbnails) {
            setThumbnails(JSON.parse(storedThumbnails));
        } else {
            generateAndSaveThumbnail(vid);
        }
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [wasAlreadyRequested]);

    return (
        <div
            className="w-full h-full justify-center items-center m-5 rounded-lg mr-auto  overflow-hidden max-h-[25%] max-w-[25%]"
            ref={thumbGenRef}
            style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "16/9"
            }}
        >
            {thumbnails.map((thumbnail, index) => (
                <Link
                    href={{
                        pathname: `/videos/${video_id}`,
                        query: { video_id }
                    }}
                    key={index}
                >
                    <Image
                        src={thumbnail}
                        alt={`Thumbnail ${index}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "100%" }}
                        className="hover:cursor-pointer"
                    />
                </Link>
            ))}
        </div>
    );
};

export default FetchThumbnail;
