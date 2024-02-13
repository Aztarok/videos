'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactPlayer from 'react-player';

const Page = () => {
	return (
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
					<ReactPlayer url="https://image.mux.com/KahxFeZiFwNYWJ1GAWu7IVygaWahyUzVckgylX63ZUU/animated.webp?width=214&height=121&time=2" />
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
	);
};

export default Page;
