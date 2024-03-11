'use client';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import PostClient from './PostClient';
import increaseData from '@/app/actions/increaseData';
import { useAppContext } from '@/app/Context/store';

export function createPostObject(post: any) {
	let images: any[] = [];
	for (let j = 0; j < post?.images?.length; j++) {
		const imageObject = post.images[j];
		const { name } = imageObject;
		images.push(`${post.post_by}/${post.id}/${imageObject.name}`);
	}
	return {
		id: post.id,
		created_at: post.created_at,
		images,
		description: post.description,
		post_by: post.post_by,
		display_name: post.profiles?.display_name,
		handle: post.profiles?.handle,
		image_user: post.profiles?.image_url,
		role: post.profiles?.role,
	};
}
const FetchMore = () => {
	const supabase = supabaseBrowser();
	const { posts, setPosts } = useAppContext();
	const [page, setPage] = useState<number>(0);
	const [turnOff, setTurnOff] = useState<boolean>(false);
	const [user, setUser] = useState<any>(async () => {
		return await supabase.auth.getUser();
	});
	const getFromAndTo = () => {
		const ITEMS_PER_PAGE = 2;
		let from = page * ITEMS_PER_PAGE;
		let to = from + ITEMS_PER_PAGE;

		// if (page > 0) {
		//     from += 1;
		// }
		to -= 1;

		return { from, to };
	};

	const getPosts = async () => {
		if (turnOff) {
			toast.error("Can't load more posts, you have reached the end");
			return;
		}

		const { from, to } = getFromAndTo();
		const data = await increaseData(from, to);

		if (!data) {
			toast.error('Failed to get posts');
			return;
		}
		if (data.length === 0) {
			toast.error('Failed to get more posts');
			setTurnOff(true);
		}
		setPage(page + 1);

		const formattedPosts = data.map(createPostObject);
		setPosts((currentPosts: any) => [...currentPosts, ...formattedPosts]);
	};

	const imageUrlHost =
		'https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/postImages/';

	let currentPost: number = 0;
	const re = /(?:\.([^.]+))?$/;
	let imagePrio = false;

	useEffect(() => {
		getPosts();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClick = async () => {
		const data = await increaseData(0, 1);
		console.log(data);
	};
	return (
		<div className="max-h-auto bg-slate-950 w-[598.67px]">
			{posts.map((post: any, index: number) => {
				currentPost++;
				return (
					<div
						key={index}
						className="border-b-[1px] border-x-[1px] p-4 border-slate-400"
					>
						<PostClient
							post={post}
							imageUrlHost={imageUrlHost}
							currentPost={currentPost}
						/>
					</div>
				);
			})}
			<div className="grid grid-cols-1 w-[60%] ml-auto mr-auto gap-10"></div>
			<Button
				onClick={() => {
					getPosts();
				}}
				className="w-full bg-amber-600 my-20"
			>
				Fetch More
			</Button>
			<Button onClick={handleClick} className="w-full bg-amber-600 my-20">
				Test
			</Button>
		</div>
	);
};

export default FetchMore;
