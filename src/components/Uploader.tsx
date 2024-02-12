'use client';

import React, { useRef, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import Tus from '@uppy/tus';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import { Button } from './ui/button';
import useUser from '@/app/hook/useUser';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { toast } from 'sonner';

const Uploader = () => {
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const { data: user } = useUser();
	const supabase = supabaseBrowser();
	const router = useRouter();
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const onBeforeRequest = async (req: any) => {
		const { data } = await supabase.auth.getSession();
		req.setHeader('Authorization', `Bearer ${data.session?.access_token}`);
	};

	const [uppy] = useState(() =>
		new Uppy({
			restrictions: {
				maxNumberOfFiles: 1,
				allowedFileTypes: ['image/*', 'video/*'],
				maxFileSize: 5 * 1000 * 1000,
			},
		}).use(Tus, {
			endpoint:
				process.env.NEXT_PUBLIC_SUPABASE_URL +
				'/storage/v1/upload/resumable',
			onBeforeRequest,
			allowedMetaFields: [
				'bucketName',
				'objectName',
				'contentType',
				'cacheControl',
			],
		})
	);

	uppy.on('file-added', (file) => {
		file.meta = {
			...file.meta,
			bucketName: 'images',
			contentType: file.type,
		};
	});

	uppy.on('upload-success', () => {
		uppy.cancelAll();
		if (inputRef.current) {
			inputRef.current.value = '';
		}
		document.getElementById('trigger-close')?.click();
		router.refresh();
	});

	uppy.on('thumbnail:generated', (file, preview) => {
		const img = new Image();
		img.src = preview;
		img.onload = () => {
			setWidth(img.width);
			setHeight(img.height);
			console.log(width);
			console.log(height);
		};
	});

	const handleUpload = () => {
		if (uppy.getFiles().length !== 0) {
			const randomUUID = crypto.randomUUID();
			uppy.setFileMeta(uppy.getFiles()[0].id, {
				objectName:
					user?.id + '/' + randomUUID + '/' + uppy.getFiles()[0].name,
			});

			const description = inputRef.current.value; // Retrieve description from input field
			uppy.upload().then(async () => {
				try {
					if (description.trim() !== '') {
						// Check if description is not empty or just whitespace
						await supabase
							.from('posts')
							.update({ description: description })
							.eq('id', randomUUID);
					}
				} catch (error) {
					toast.error('Failed to update description');
				}
			});
		} else {
			toast.warning('Please add an image');
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button id="upload-trigger" />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload a file</DialogTitle>
					<DialogDescription>Select your video</DialogDescription>
				</DialogHeader>
				<div className="space-y-5">
					<Dashboard
						uppy={uppy}
						className="w-auto"
						hideUploadButton
					/>
					<Input placeholder="Image description" ref={inputRef} />
					<Button className="w-full" onClick={handleUpload}>
						Upload
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Uploader;
