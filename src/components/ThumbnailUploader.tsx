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
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Uploader({
    access,
    userId,
    uuid,
    onThumbnailUploaded
}: {
    access: any;
    userId: any;
    uuid: any;
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
        if (uppy.getFiles().length !== 0) {
            const file = uppy.getFiles()[0];
            uppy.setFileMeta(file.id, {
                objectName: userId + "/" + uuid + "/" + file.name
            });
            onThumbnailUploaded(file, blober);
            document.getElementById("thumb-trigger")?.click();
            uppy.removeFile(file.id);
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
                    <Button
                        className="w-full"
                        onClick={() => console.log(uppy.getState())}
                    >
                        Bruh
                    </Button>
                    <Button
                        className="w-full"
                        onClick={() => console.log(uppy.getFiles()[0])}
                    >
                        Bruh 2
                    </Button>
                    <Button className="w-full" onClick={handleUpload}>
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
// ThumbnailUploader.tsx
// "use client";
// import React, { useState } from "react";
// import Uppy from "@uppy/core";
// import { Dashboard } from "@uppy/react";
// import "@uppy/core/dist/style.min.css";
// import "@uppy/dashboard/dist/style.min.css";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import Tus from "@uppy/tus";

// interface ThumbnailUploaderProps {
//     access: string;
//     userId: any;
//     uuid: string;
//     onThumbnailUploaded: (thumbnailFile: Blob) => void;
// }

// const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({
//     access,
//     userId,
//     uuid,
//     onThumbnailUploaded
// }) => {
//     const router = useRouter();

//     const onBeforeRequest = async (req: any) => {
//         req.setHeader("Authorization", `Bearer ${access}`);
//     };

//     const [uppy] = useState(() =>
//         new Uppy({
//             restrictions: {
//                 maxNumberOfFiles: 2,
//                 allowedFileTypes: ["image/*", "video/*"],
//                 maxFileSize: 50 * 1000 * 1000
//             }
//         }).use(Tus, {
//             endpoint:
//                 process.env.NEXT_PUBLIC_SUPABASE_URL +
//                 "/storage/v1/upload/resumable",
//             onBeforeRequest,
//             allowedMetaFields: [
//                 "bucketName",
//                 "objectName",
//                 "contentType",
//                 "cacheControl"
//             ]
//         })
//     );

//     const handleUpload = async () => {
//         uppy.on("upload-success", async () => {
//             try {
//                 const file = uppy.getFiles()[0];
//                 const thumbnailFile = file.data;
//                 onThumbnailUploaded(thumbnailFile); // Call the callback function with the thumbnail file
//             } catch (error) {
//                 console.error("Error getting uploaded file:", error);
//                 toast.error("Error getting uploaded file");
//             }
//         });

//         try {
//             await uppy.upload();
//         } catch (error) {
//             console.error("Error uploading file:", error);
//             toast.error("Error uploading file");
//         }
//     };

//     return (
//         <div>
//             <Dashboard className="w-auto" hideUploadButton={true} uppy={uppy} />
//             <Input placeholder="Image description" />
//             <Button className="w-full" onClick={handleUpload}>
//                 Upload
//             </Button>
//         </div>
//     );
// };

// export default ThumbnailUploader;
