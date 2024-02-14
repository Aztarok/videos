'use client';

import { generateVideoThumbnailViaUrl } from '@/index';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const FetchThumbnail = ({
	post_by,
	video_id,
	video_name,
}: {
	post_by: string;
	video_id: string;
	video_name: string;
}) => {
	const [thumbnails, setThumbnails] = useState<string[]>([]);
	const wasAlreadyRequested = useRef(false);
	const thumbGenRef = useRef<HTMLDivElement>(null);
	const baseUrl =
		'https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/';
	const vid = `${baseUrl}${post_by}/${video_id}/${video_name}`;
	const genThumbnail = async (num: number, vid: string) => {
		const thumbGenDiv = thumbGenRef.current;
		let time = 0.5;
		let thumbs: string[] = [];
		for (let i = 0; i < num; i++) {
			try {
				wasAlreadyRequested.current = true;
				const result = await generateVideoThumbnailViaUrl(vid, time);
				if (result) {
					// const img = document.createElement('img');
					// img.src = result;
					// img.width = 800;
					// img.height = 400;
					// img.classList.add('hover:cursor-pointer');
					// thumbGenDiv!.append(img);
					thumbs.push(result);
				}
			} catch (error) {}
			setThumbnails(thumbs);
		}
	};
	useEffect(() => {
		if (!wasAlreadyRequested.current) {
			genThumbnail(1, vid);
		}
		return () => {};
	}, [wasAlreadyRequested]);

	return (
		<div
			className="w-full h-full justify-center items-center m-5 rounded-lg overflow-hidden"
			ref={thumbGenRef}
			style={{
				position: 'relative',
				overflow: 'hidden',
				aspectRatio: '16/9',
			}}
		>
			{thumbnails.map((thumbnail, index) => (
				<Image
					key={index}
					src={thumbnail}
					alt={`Thumbnail ${index}`}
					width={0}
					height={0}
					sizes="100vw"
					style={{ width: '100%', height: '100%' }}
					className="hover:cursor-pointer"
				/>
			))}
		</div>
	);
};

export default FetchThumbnail;
