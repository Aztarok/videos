'use client';

import React, { useState } from 'react';
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

const Uploader = () => {
	const { data: user } = useUser();
	const supabase = supabaseBrowser();
	const router = useRouter();

	const onBeforeRequest = async (req: any) => {
		const { data } = await supabase.auth.getSession();
		console.log(data);
		req.setHeader('Authorization', `Bearer ${data.session?.access_token}`);
	};

	const [uppy] = useState(() =>
		new Uppy({
			restrictions: {
				maxNumberOfFiles: 1,
				allowedFileTypes: ['image/*'],
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
		console.log('file added');
		file.meta = {
			...file.meta,
			bucketName: 'images',
			contentType: file.type,
		};
	});

	const handleUpload = () => {
		uppy.setFileMeta(uppy.getFiles()[0].id, {
			objectName: user?.id + '/' + uppy.getFiles()[0].name,
		});

		uppy.upload();
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
					<Button className="w-full" onClick={handleUpload}>
						Upload
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Uploader;
