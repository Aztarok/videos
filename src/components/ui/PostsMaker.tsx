'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import React, { useEffect, useRef, useState } from 'react';

import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';

import { useAppContext } from '@/app/Context/store';
import { supabaseBrowser } from '@/lib/supabase/browser';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import Tus from '@uppy/tus';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from './button';
import { Textarea } from './textarea';

export default function PostsMaker() {
	const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
	const supabase = supabaseBrowser();
	const router = useRouter();
	const fileUploadPath: string =
		process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/upload/resumable';
	const [postContent, setPostContent] = useState<string>();
	const { state, session } = useAppContext();
	const [uppy, setUppy] = useState<Uppy>();
	const onBeforeRequest = async (req: any) => {
		req.setHeader(
			'Authorization',
			`Bearer ${session.session.access_token}`
		);
	};

	useEffect(() => {
		if (session) {
			const uppyInstance = new Uppy({
				restrictions: {
					maxNumberOfFiles: 4,
					allowedFileTypes: ['image/*', 'video/*'],
					maxFileSize: 10 * 1000 * 1000,
				},
			}).use(Tus, {
				endpoint: fileUploadPath,
				onBeforeRequest,
				allowedMetaFields: [
					'bucketName',
					'objectName',
					'contentType',
					'cacheControl',
				],
				removeFingerprintOnSuccess: true,
				limit: 4,
			});
			setUppy(uppyInstance);

			return () => {
				uppyInstance.close();
			};
		}
	}, [session]);
	if (!session || !uppy || !state) {
		return null;
	}
	function textarea_height(e: any) {
		const textarea = e.target;
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
		setPostContent(inputRef.current.value);
	}

	uppy.on('file-added', (file) => {
		file.meta = {
			...file.meta,
			bucketName: 'postImages',
			contentType: file.type,
		};
	});

	uppy.on('complete', () => {
		uppy.cancelAll();
		if (inputRef.current) {
			inputRef.current.value = '';
		}
		document.getElementById('trigger-close')?.click();
		router.refresh();
	});
	const handleUpload = async () => {
		const randomUUID = crypto.randomUUID();
		if (uppy.getFiles().length !== 0) {
			for (let i = 0; i < uppy.getFiles().length; i++) {
				uppy.setFileMeta(uppy.getFiles()[i].id, {
					objectName:
						state?.id +
						'/' +
						randomUUID +
						'/' +
						uppy.getFiles()[i].name,
				});
			}

			const { successful } = await uppy.upload();

			if (!successful) {
				toast.error('You have to wait before making new posts');
			}
			await supabase
				.from('posts')
				.update({ description: postContent })
				.eq('id', randomUUID);
			document.getElementById('trigger-close')?.click();
			router.refresh();
			toast.success('You made a post!');
		} else if (uppy.getFiles().length === 0 && postContent) {
			await supabase.from('posts').insert({
				id: randomUUID,
				description: postContent,
				post_by: state?.id!,
			});
			document.getElementById('trigger-close')?.click();
			router.refresh();
			toast.success('You made a post!');
		} else {
			toast.warning('Please add content to the post');
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button id="upload-post" className="w-0 h-0"></button>
			</DialogTrigger>
			<DialogContent className="flex flex-col">
				<DialogHeader>
					<DialogTitle>Make A Post</DialogTitle>
					<DialogDescription>
						Write whatever you want
					</DialogDescription>
				</DialogHeader>
				<Textarea
					id="text"
					typeof="text"
					onChange={(e) => textarea_height(e)}
					placeholder="Beginning of an epic post..."
					ref={inputRef}
					className="no-scrollbar resize-none"
					maxLength={300}
				/>
				<div className="space-y-5">
					<div className="flex justify-between">
						<span className="underline underline-offset-4">
							Upload some images or videos
						</span>
						<span className=" underline underline-offset-4">
							Characters used{' '}
							<span className="text-blue-500 font-bold ">
								{postContent?.length}
							</span>{' '}
							/ 300
						</span>
					</div>
					<Dashboard
						uppy={uppy}
						className="w-auto"
						hideUploadButton
					/>
					<Button
						className="w-full text-white text-md"
						onClick={handleUpload}
					>
						Upload
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
