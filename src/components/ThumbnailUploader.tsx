"use client";
import React, { useRef, useState } from "react";
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
import { Button } from "./ui/button";
import Tus from "@uppy/tus";
import useUser from "@/app/hook/useUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Uploader({
    access,
    userId,
    uuid
}: {
    access: any;
    userId: any;
    uuid: any;
}) {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const router = useRouter();
    const supabase = supabaseBrowser();
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
    });

    uppy.on("upload-success", () => {
        // uppy.cancelAll();
        // if (inputRef.current) {
        //     inputRef.current.value = "";
        // }
        // router.refresh();
    });

    const handleUpload = () => {
        if (uppy.getFiles().length !== 0) {
            uppy.setFileMeta(uppy.getFiles()[0].id, {
                objectName: userId + "/" + uuid + "/" + uppy.getFiles()[0].name
            });
            uppy.upload();
        } else {
            toast.warning("Please adding an image");
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
                    <Input placeholder=" image description" ref={inputRef} />
                    <Button className="w-full" onClick={handleUpload}>
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
