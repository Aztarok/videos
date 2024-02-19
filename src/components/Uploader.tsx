"use client";

import useUser from "@/app/hook/useUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
    generateVideoThumbnails,
    getVideoDurationFromVideoFile
} from "../index";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import ThumbnailUploader from "./ThumbnailUploader";
import { randomUUID } from "crypto";

const Uploader = () => {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const { data: user } = useUser();
    const supabase = supabaseBrowser();
    const router = useRouter();
    const [thumbnail, setThumbnail] = useState<any>(null);
    const [vidDuration, setVidDuration] = useState<any>(0);
    const [custom, setCustom] = useState<boolean>(false);
    const [currentFile, setCurrentFile] = useState<any>(null);
    const [session, setSession] = useState<any>(null);
    const [blobers, setBlobers] = useState<any>(null);
    const onBeforeRequest = async (req: any) => {
        const { data } = await supabase.auth.getSession();
        setSession(data);
        req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);
    };

    const generateAndSaveThumbnail = async (vid: File, time: number) => {
        // Modify the function to accept the time parameter
        try {
            // time = await getVideoDurationFromVideoFile(vid);
            // setVidDuration(time);
            const result = await generateVideoThumbnails(
                vid,
                1,
                vid.type,
                time
            ); // Pass the selected time to generateVideoThumbnails function
            if (result) {
                setThumbnail(result[0]);
            }
        } catch (error) {
            console.error("Error generating thumbnail:", error);
        }
    };

    // Initialize Uppy instance
    const [uppy] = useState(() =>
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 2,
                allowedFileTypes: ["image/*", "video/*"],
                maxFileSize: 50 * 1000 * 1000
            }
        }).use(Tus, {
            endpoint:
                process.env.NEXT_PUBLIC_SUPABASE_URL +
                "/storage/v1/upload/resumable",
            onBeforeRequest,
            allowedMetaFields: [
                "bucketName",
                "objectName",
                "contentType",
                "cacheControl"
            ]
        })
    );

    // Event listener for file added event
    uppy.on("file-added", async (file) => {
        file.meta = {
            ...file.meta,
            bucketName: "postImages",
            contentType: file.type
        };
        if (file.data instanceof File) {
            setCurrentFile(file.data);
            if (file.type === "video/mp4") {
                let time = await getVideoDurationFromVideoFile(file.data);
                setVidDuration(time - 0.01);
                // generateAndSaveThumbnail(file.data, 0); // Pass the current time to generateAndSaveThumbnail
            }
        }
        return () => {};
    });
    const randomUUID = crypto.randomUUID();

    uppy.on("dashboard:modal-open", () => {});

    // Event listener for successful upload
    uppy.on("upload-success", () => {
        uppy.cancelAll();
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        document.getElementById("trigger-close")?.click();
        router.refresh();
    });

    uppy.on("file-removed", (file) => {
        setThumbnail(null);
        setVidDuration(0);
        setCustom(false);
        setCurrentFile(null);
    });

    const findFiles = () => {
        for (let i = 0; i < uppy.getFiles().length; i++) {
            const currentFile = uppy.getFiles()[i];
            console.log(currentFile);
        }
    };

    const handleUpload = () => {
        if (uppy.getFiles().length !== 0) {
            uppy.setFileMeta(uppy.getFiles()[0].id, {
                objectName:
                    user?.id + "/" + randomUUID + "/" + uppy.getFiles()[0].name
            });

            const description = inputRef.current.value; // Retrieve description from input field
            const fileType: any = uppy.getFiles()[0].meta.type;
            uppy.upload().then(async () => {
                try {
                    // Check if description is not empty or just whitespace
                    await supabase
                        .from("posts")
                        .update({
                            description: description || "",
                            type: fileType
                        })
                        .eq("id", randomUUID);
                } catch (error) {
                    console.error("Failed to update description:", error);
                    toast.error("Failed to update description");
                }
            });
        } else {
            toast.warning("Please add an image");
        }
    };

    const handleSlider = async (e: any) => {
        const currentValue = e[0];
        let currentFrame;
        if (currentValue === 100) {
            currentFrame = vidDuration;
        } else if (currentValue == 0) {
            currentFrame = 0;
        } else {
            currentFrame = (vidDuration / 100) * currentValue; // Corrected time calculation
        }
        setThumbnail(null);
        try {
            await generateAndSaveThumbnail(
                currentFile,
                currentFrame.toFixed(2)
            ); // Ensure asynchronous execution
        } catch (error) {
            console.error("Error generating and saving thumbnail:", error);
            toast.error("Error generating and saving thumbnail");
        }
    };

    let debounce = require("lodash.debounce");
    const debounceHandleSlider = debounce(handleSlider, 500);

    const onThumbnailUploaded = async (thumbnailFile: any, blober: any) => {
        await setThumbnail(thumbnailFile);
        await setBlobers(blober);
        if (thumbnailFile && blober) {
            await new Promise((resolve: any) => setTimeout(resolve, 1000));
            await handleTransfer(thumbnailFile, blober);
        }
    };

    const handleThumbDelete = () => {
        setThumbnail(null);
    };
    const handleSwitch = () => {
        setCustom(!custom);
        setThumbnail(null);
    };
    const handleTransfer = (thumbnailFile: any, blober: any) => {
        uppy.addFile({ ...thumbnailFile, preview: blober });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button id="upload-trigger" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a post</DialogTitle>
                    <DialogDescription>Add files if you want</DialogDescription>
                </DialogHeader>
                <div className="space-y-5">
                    <Input
                        placeholder="Write anything you want"
                        ref={inputRef}
                    />

                    <Dashboard
                        uppy={uppy}
                        className="w-auto"
                        hideUploadButton
                    />
                    <Button onClick={() => console.log(uppy.getState())}>
                        Bruh
                    </Button>
                    <Button onClick={() => findFiles()}>Bruh 2</Button>
                    <Button onClick={() => handleTransfer(thumbnail, blobers)}>
                        Bruh 3
                    </Button>
                    {currentFile?.type === "video/mp4" && (
                        <div>
                            <div className="flex justify-between">
                                {custom ? (
                                    <h1 className="mb-5">
                                        Use this slider to pick a thumbnail
                                    </h1>
                                ) : (
                                    <h1 className="mb-5">
                                        Upload your own thumbnail
                                    </h1>
                                )}
                                <div className="flex gap-2">
                                    <h1>Or</h1>
                                    <Switch
                                        onCheckedChange={handleSwitch}
                                        className=""
                                    />
                                </div>
                            </div>
                            {custom ? (
                                <>
                                    <div className="w-full flex justify-center">
                                        <Slider
                                            max={100}
                                            step={1}
                                            onValueChange={debounceHandleSlider}
                                            className="w-[80%]"
                                        />
                                    </div>
                                    <Separator className="my-4 bg-white" />
                                    {thumbnail && (
                                        <>
                                            Hi
                                            {typeof thumbnail}
                                            <Image
                                                src={URL.createObjectURL(
                                                    thumbnail
                                                )}
                                                alt={`Thumbnail ${thumbnail}`}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                className="hover:cursor-pointer"
                                            />
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {!thumbnail ? (
                                        <Button
                                            onClick={() => {
                                                document
                                                    .getElementById(
                                                        "thumb-trigger"
                                                    )
                                                    ?.click();
                                            }}
                                            variant="link"
                                        >
                                            Upload Thumbnail
                                        </Button>
                                    ) : (
                                        <div className="flex flex-col">
                                            {thumbnail ? (
                                                <>
                                                    {/* {JSON.stringify(thumbnail)} */}
                                                    {thumbnail.source ? (
                                                        <div>Hi</div>
                                                    ) : null}
                                                    <Button
                                                        className="absolute self-end"
                                                        onClick={
                                                            handleThumbDelete
                                                        }
                                                    >
                                                        X
                                                    </Button>

                                                    {/* <Image
                                                        src={URL.createObjectURL(
                                                            thumbnail
                                                        )}
                                                        alt="thumb"
                                                        width={200}
                                                        height={100}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%"
                                                        }}
                                                    /> */}
                                                </>
                                            ) : null}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    <ThumbnailUploader
                        access={session}
                        userId={user?.id}
                        onThumbnailUploaded={onThumbnailUploaded}
                    />
                    <Button className="w-full" onClick={handleUpload}>
                        Upload
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Uploader;
