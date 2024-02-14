'use client';

import { generateVideoThumbnailViaUrl } from '@/index';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
	const cors = require('cors');

	const [texto, setTexto] = useState('');
	const [resulto, setResulto] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const thumbnailContainer = document.querySelector('.imgContainer');
		const thumbnailImages = [];
		const numThumbnails = 5;
		let time = 0.5;
		for (let i = 0; i < numThumbnails; i++) {
			try {
				// Generate thumbnail for the current iteration
				const result = await generateVideoThumbnailViaUrl(texto, time);

				// Create an image element for the thumbnail
				const img = document.createElement('img');
				img.src = result;
				img.width = 800;
				img.height = 400;

				// Append the image to the thumbnail container
				thumbnailContainer!.appendChild(img);

				// Push the image element to the array
				thumbnailImages.push(img);
				time += 0.1;
			} catch (error) {
				console.error(`Error generating thumbnail ${i + 1}:`, error);
			}
		}

		// try {
		// 	let result = await generateVideoThumbnailViaUrl(texto, 0.5);
		// 	setResulto(result);
		// 	let img = document.createElement('img');
		// 	img.src = result;
		// 	img.width = 800;
		// 	img.height = 400;
		// 	thumbnailContainer!.append(img);
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	return (
		<div className="h-screen">
			<div>
				<form action="" onSubmit={(e) => handleSubmit(e)}>
					<input
						type="text"
						className="bg-white text-black"
						onChange={(e) => setTexto(e.currentTarget.value)}
					/>
					<button type="submit">Submit</button>
				</form>
				<div className="imgContainer"></div>
			</div>
			<div className="flex bg-slate-950 flex-col max-w-screen absolute overflow-hidden inset-x-0 pt-4 pb-20 mb-20 space-y-5">
				<div className="flex-1 flex justify-around items-center px-10">
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Link
							className="flex w-full h-full justify-center items-center overflow-hidden"
							href={`/videos/86522423-3310-4b10-8dce-37b3e45b3ea3`}
						>
							<Image
								src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
								alt="video image"
								height={0}
								width={0}
								sizes="100vw"
								style={{ width: '100%', height: '100%' }}
								className="hover:cursor-pointer"
							/>
						</Link>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<video controls>
							<source
								src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/b9e2283a-974d-4fa1-babd-24929027eb8e/549456ce-c37b-4d8f-a671-fa1fd330d0b1/youtube_MvsAesQ-4zA_1920x1080_h264.mp4`}
							/>
						</video>
					</div>
					<div className="bg-gray-300 flex flex-col relative w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden vid">
						<Image
							src={`https://image.mux.com/KahxFeZiFwNYWJ1GAWu7IVygaWahyUzVckgylX63ZUU/thumbnail.webp?width=214&height=121&time=2`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer still-frame absolute"
						/>
						<Image
							src={`https://image.mux.com/KahxFeZiFwNYWJ1GAWu7IVygaWahyUzVckgylX63ZUU/animated.webp?width=214&height=121&time=2`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer preview"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<video controls>
							<source
								src="https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/b9e2283a-974d-4fa1-babd-24929027eb8e/05d4aa88-2157-4eca-ae71-fa9828f94e59/youtube_5DEdR5lqnDE_1280x720_h264.mp4"
								type="video/mp4"
							/>
						</video>
					</div>
				</div>
				<div className="flex-1 flex justify-around items-center px-10">
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
				</div>
				<div className="flex-1 flex justify-around items-center px-10">
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
				</div>
				<div className="flex-1 flex justify-around items-center px-10">
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
					<div className="bg-gray-300 flex w-full h-full justify-center items-center m-5 my-2 rounded-lg overflow-hidden">
						<Image
							src={`https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/1d065281-7e5c-4199-b53d-6de562588ab3/86522423-3310-4b10-8dce-37b3e45b3ea3/download%20(2).jpg`}
							alt="video image"
							height={0}
							width={0}
							sizes="100vw"
							style={{ width: '100%', height: '100%' }}
							className="hover:cursor-pointer"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
