"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Button } from "./button";
import Tus from "@uppy/tus";
import useUser from "@/app/hook/useUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Input } from "./input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Textarea } from "./textarea";

export default function PostsMaker({ up, down }: { up: string; down: string }) {
    const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
    const { data: user } = useUser();
    const supabase = supabaseBrowser();
    const router = useRouter();
    const fileUploadPath: string =
        process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/upload/resumable";
    const [postContent, setPostContent] = useState<string>();
    const onBeforeRequest = async (req: any) => {
        const { data } = await supabase.auth.getSession();
        req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);
    };
    const [uppy] = useState(() =>
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 4,
                allowedFileTypes: ["image/*", "video/*"],
                maxFileSize: 10 * 1000 * 1000
            }
        }).use(Tus, {
            endpoint: fileUploadPath,
            onBeforeRequest,
            allowedMetaFields: [
                "bucketName",
                "objectName",
                "contentType",
                "cacheControl"
            ],
            removeFingerprintOnSuccess: true,
            limit: 4
        })
    );
    function textarea_height(e: any) {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        setPostContent(inputRef.current.value);
    }

    uppy.on("file-added", (file) => {
        file.meta = {
            ...file.meta,
            bucketName: "postImages",
            contentType: file.type
        };
    });

    uppy.on("complete", () => {
        uppy.cancelAll();
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        document.getElementById("trigger-close")?.click();
        router.refresh();
    });
    const handleUpload = async () => {
        // const redisNew = new Redis({
        //     url: up,
        //     token: down
        // });

        // const rate = new Ratelimit({
        //     redis: redisNew,
        //     limiter: Ratelimit.slidingWindow(10, "1h"),
        //     analytics: true,
        //     prefix: "@upstash/ratelimit"
        // });

        const randomUUID = crypto.randomUUID();
        if (uppy.getFiles().length !== 0) {
            for (let i = 0; i < uppy.getFiles().length; i++) {
                uppy.setFileMeta(uppy.getFiles()[i].id, {
                    objectName:
                        user?.id +
                        "/" +
                        randomUUID +
                        "/" +
                        uppy.getFiles()[i].name
                });
            }
            // const { success } = await rate.limit(user?.id!);
            const { successful } = await uppy.upload();

            if (!successful) {
                toast.error("You have to wait before making new posts");
            }
            const { data, error } = await supabase
                .from("posts")
                .update({ description: postContent })
                .eq("id", randomUUID);
            document.getElementById("trigger-close")?.click();
            router.refresh();
            toast.success("You made a post!");
        } else if (uppy.getFiles().length === 0 && postContent) {
            await supabase.from("posts").insert({
                id: randomUUID,
                description: postContent,
                post_by: user?.id!
            });
            document.getElementById("trigger-close")?.click();
            router.refresh();
            toast.success("You made a post!");
        } else {
            toast.warning("Please add content to the post");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button id="upload-post" className="w-0 h-0"></button>
            </DialogTrigger>
            <DialogContent className="flex flex-col">
                <DialogHeader>
                    <DialogTitle>Make A Post</DialogTitle>
                    <DialogDescription>
                        Write whatever you want
                    </DialogDescription>
                </DialogHeader>
                <Textarea
                    id="text"
                    typeof="text"
                    onChange={(e) => textarea_height(e)}
                    placeholder="Beginning of an epic post..."
                    ref={inputRef}
                    className="no-scrollbar resize-none"
                    maxLength={300}
                />
                <div className="space-y-5">
                    <div className="flex justify-between">
                        <span className="underline underline-offset-4">
                            Upload some images or videos
                        </span>
                        <span className=" underline underline-offset-4">
                            Characters used{" "}
                            <span className="text-blue-500 font-bold ">
                                {postContent?.length}
                            </span>{" "}
                            / 300
                        </span>
                    </div>
                    <Dashboard
                        uppy={uppy}
                        className="w-auto"
                        hideUploadButton
                    />
                    <Button
                        className="w-full text-white text-md"
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
