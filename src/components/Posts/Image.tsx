// Image.tsx
import Image from 'next/image';

interface ImageProps {
	imageUrl: string;
	alt: string;
	aspectRatio: number;
	prio: boolean;
}

const ImageComponent: React.FC<ImageProps> = ({
	imageUrl,
	alt,
	aspectRatio,
	prio,
}) => {
	return (
		<Image
			src={imageUrl}
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
