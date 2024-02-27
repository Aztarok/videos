"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React, { useRef, useState } from "react";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import Tus from "@uppy/tus";
import { toast } from "sonner";
import { Button } from "./button";
import { Input } from "./input";

export default function Uploader({
    access,
    userId,
    onThumbnailUploaded
}: {
    access: any;
    userId: any;
    onThumbnailUploaded: (thumbnailFile: any, blober: any) => void;
}) {
    const [blober, setBlober] = useState<any>("");
    const onBeforeRequest = async (req: any) => {
        req.setHeader("Authorization", `Bearer ${access}`);
    };
    const [uppy] = useState(() =>
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 1,
                allowedFileTypes: ["image/*"],
                maxFileSize: 5 * 1000 * 1000
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

    uppy.on("file-added", (file) => {
        file.meta = {
            ...file.meta,
            bucketName: "images",
            contentType: file.type
        };
        const blob = new Blob([file.data], { type: file.type });
        setBlober(URL.createObjectURL(blob));
    });

    uppy.on("upload-success", () => {
        // uppy.cancelAll();
        // if (inputRef.current) {
        //     inputRef.current.value = "";
        // }
        // router.refresh();
    });

    const handleUpload = () => {
        const randomUUID = crypto.randomUUID();
        if (uppy.getFiles().length !== 0) {
            const file = uppy.getFiles()[0];
            uppy.setFileMeta(file.id, {
                objectName: userId + "/" + randomUUID + "/" + file.name
            });
            onThumbnailUploaded(file, blober);
            document.getElementById("thumb-trigger")?.click();
            uppy.removeFile(file.id);
        } else {
            toast.warning("Please add an image");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button id="thumb-trigger"></button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thumbnail Upload</DialogTitle>
                    <DialogDescription>Select your photo.</DialogDescription>
                </DialogHeader>
                <div className=" space-y-5">
                    <Dashboard
                        uppy={uppy}
                        className="w-auto"
                        hideUploadButton
                    />

                    <Button className="w-full" onClick={handleUpload}>
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
