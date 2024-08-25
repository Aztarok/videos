import { useEffect, useState } from "react";
import { getMediaData } from "@/app/actions";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface ImageProps {
    imageUrl: string;
    alt: string;
    aspectRatio: number;
    prio?: boolean;
}

const ImageComponent: React.FC<ImageProps> = ({
    imageUrl,
    alt,
    aspectRatio,
    prio
}) => {
    const [imageLink, setImageLink] = useState<string | null>(null);

    useEffect(() => {
        const fetchImageLink = async () => {
            const link = await getMediaData({ imageData: imageUrl });
            setImageLink(link);
        };
        fetchImageLink();
    }, [imageUrl]);

    if (!imageLink) {
        return (
            <div className="text-white">
                <Skeleton className="w-full min-h-[500px]" />
            </div>
        ); // Or a placeholder image
    }

    return (
        <Image
            src={imageLink}
            alt={alt}
            width={0}
            height={0}
            priority={prio}
            sizes="100vw"
            className="object-cover object-center w-full h-full"
            style={{ aspectRatio }}
        />
    );
};

export default ImageComponent;
