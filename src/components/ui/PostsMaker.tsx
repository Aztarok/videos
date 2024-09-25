"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React, { useEffect, useRef, useState } from "react";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";

import { useAppContext } from "@/app/Context/store";
import { supabaseBrowser } from "@/lib/supabase/browser";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import Tus from "@uppy/tus";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./button";
import { Textarea } from "./textarea";
import postHelper from "@/app/actions/postHelper";
import { createPostObject } from "../Posts/FetchMore";
import { usePostsStore } from "@/app/Context/postStore";

export default function PostsMaker() {
    const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
    const supabase = supabaseBrowser();
    const router = useRouter();
    const fileUploadPath: string =
        process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/upload/resumable";
    const [postContent, setPostContent] = useState<string>();
    const { state, session, setPosts } = useAppContext();
    const [uppy, setUppy] = useState<Uppy>();
    const [isUploading, setIsUploading] = useState(false);
    const addPost = usePostsStore((state) => state.addPost);
    const onBeforeRequest = async (req: any) => {
        req.setHeader(
            "Authorization",
            `Bearer ${session.session.access_token}`
        );
    };

    const appendPost = async () => {
        const data = await postHelper();

        document.getElementById("trigger-close")?.click();

        if (data?.length === 0) {
            return null;
        }
        const formattedPost: any = data?.map(createPostObject);
        setPosts((currentPosts: any) => [...formattedPost, ...currentPosts]);
        router.refresh();
        toast.success("You made a post!");
    };

    useEffect(() => {
        if (session) {
            const uppyInstance = new Uppy({
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
            });
            setUppy(uppyInstance);

            return () => {
                uppyInstance.close();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);
    if (!session || !uppy || !state) {
        return null;
    }
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
        if (!uppy) {
            throw Error;
        }
        setIsUploading(true);
        try {
            const randomUUID = crypto.randomUUID();
            if (uppy.getFiles().length !== 0) {
                for (let i = 0; i < uppy.getFiles().length; i++) {
                    uppy.setFileMeta(uppy.getFiles()[i].id, {
                        objectName:
                            state?.id +
                            "/" +
                            randomUUID +
                            "/" +
                            uppy.getFiles()[i].name
                    });
                }

                const { successful } = await uppy.upload();

                if (!successful) {
                    toast.error("You have to wait before making new posts");
                    return;
                }
                await supabase
                    .from("posts")
                    .update({ description: postContent })
                    .eq("id", randomUUID);

                // Create a new post object
                const newPost = createPostObject({
                    id: randomUUID,
                    created_at: new Date().toISOString(),
                    images: uppy
                        .getFiles()
                        .map(
                            (file) => `${state?.id}/${randomUUID}/${file.name}`
                        ),
                    description: postContent,
                    post_by: state?.id,
                    profiles: {
                        display_name: state?.display_name,
                        handle: state?.handle,
                        image_url: state?.image_url,
                        role: state?.role
                    }
                });

                // Add the new post to the store
                addPost(newPost);

                await appendPost();
                router.push("/"); // Refresh the page
            } else if (uppy.getFiles().length === 0 && postContent) {
                await supabase.from("posts").insert({
                    id: randomUUID,
                    description: postContent,
                    post_by: state?.id!
                });

                // Create a new post object for text-only post
                const newPost = createPostObject({
                    id: randomUUID,
                    created_at: new Date().toISOString(),
                    images: [],
                    description: postContent,
                    post_by: state?.id,
                    profiles: {
                        display_name: state?.display_name,
                        handle: state?.handle,
                        image_url: state?.image_url,
                        role: state?.role
                    }
                });

                // Add the new post to the store
                addPost(newPost);

                await appendPost();
                router.push("/"); // Refresh the page
            } else {
                toast.warning("Please add content to the post");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("An error occurred during upload");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button id="upload-post" className="w-0 h-0 hidden"></button>
            </DialogTrigger>
            <DialogContent className="flex bg-slate-950 text-white flex-col">
                <DialogHeader>
                    <DialogTitle>Make A Post</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Write whatever you want
                    </DialogDescription>
                </DialogHeader>
                <Textarea
                    id="text"
                    typeof="text"
                    onChange={(e) => textarea_height(e)}
                    placeholder="Beginning of an epic post..."
                    ref={inputRef}
                    className="no-scrollbar resize-none bg-slate-900"
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
                        disabled={isUploading}
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
