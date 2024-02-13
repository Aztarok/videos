'use client';
import React from 'react';
import { Button } from './ui/button';
import useUser from '@/app/hook/useUser';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const DeletePost = ({ post_by, image }: { post_by: string; image: string }) => {
	const { data: user, isFetching } = useUser();
	const router = useRouter();

	const handleDelete = async () => {
		const supabase = supabaseBrowser();
		const { error } = await supabase.storage.from('images').remove([image]);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success('Successfully removed an image');
			router.refresh();
		}
	};

	if (isFetching) {
		return <></>;
	}
	if (user?.id === post_by) {
		return (
			<div className="absolute top-6 right-0">
				<Button onClick={handleDelete}>Delete</Button>
			</div>
		);
	}

	return <></>;
};

export default DeletePost;
