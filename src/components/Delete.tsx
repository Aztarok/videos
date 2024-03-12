'use client';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/Context/store';

const Delete = ({ post_name, postId }: { post_name: any; postId: any }) => {
	const router = useRouter();
	const supabase = supabaseBrowser();
	const { setPosts } = useAppContext();
	const handleDelete = async () => {
		for (let i = 0; i < post_name.length; i++) {
			const image = post_name[i];
			const { error } = await supabase.storage
				.from('postImages')
				.remove([image]);
		}
		setPosts((currentPosts: any) =>
			currentPosts.filter((post: any) => post.id !== postId)
		);
		await supabase.from('posts').delete().eq('id', postId);
		router.refresh();
	};
	return (
		<>
			<Button className="" onClick={handleDelete}>
				Delete Post
			</Button>
		</>
	);
};

export default Delete;
