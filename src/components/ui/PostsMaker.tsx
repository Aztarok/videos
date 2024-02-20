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
import { Button } from "./button";
import Tus from "@uppy/tus";
import useUser from "@/app/hook/useUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Input } from "./input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export default function PostsMaker() {
    const redis = new Redis({
        url: "https://us1-immense-pigeon-41345.upstash.io",
        token: "AaGBASQgMjc1NmNiYjktMTliOS00ZDAwLTlmZDMtOTA2YjYzZDkyNGU5MWE5YTUwYTZmNzZmNDY1Mjg4MGRmYjZlMGIxNGFiNmM="
    });
    const rateLimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(10, "1 h"),
        analytics: true,
        prefix: "@upstash/ratelimit"
    });

    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const { data: user } = useUser();
    const supabase = supabaseBrowser();
    const router = useRouter();
    const fileUploadPath: string =
        process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/upload/resumable";

    const onBeforeRequest = async (req: any) => {
        const { data } = await supabase.auth.getSession();
        const { success } = await rateLimit.limit(fileUploadPath);
        console.log(success);
        req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);
    };
    const [uppy] = useState(() =>
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 4,
                allowedFileTypes: ["image/*"],
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
    function filterAndDelete(keyword: string) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key?.includes(keyword)) {
                localStorage.removeItem(key);
                // Adjust index after removing an item
                i--;
            }
        }
    }

    const handleUpload = async () => {
        if (uppy.getFiles().length !== 0) {
            const randomUUID = crypto.randomUUID();
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
            await uppy.upload();
        } else {
            toast.warning("Please add an image");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button id="upload-post"></button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Make A Post</DialogTitle>
                    <DialogDescription>
                        Write whatever you want
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Beginning of an epic post..."
                    ref={inputRef}
                />
                <div className=" space-y-5">
                    <span className="underline underline-offset-4">
                        Upload some images or videos if you want
                    </span>
                    <Dashboard
                        uppy={uppy}
                        className="w-auto"
                        hideUploadButton
                    />
                    <Button className="w-full" onClick={handleUpload}>
                        Upload
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
