'use client';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import PostClient from './PostClient';
import increaseData from '@/app/actions/increaseData';
import { useAppContext } from '@/app/Context/store';
import { useRouter } from 'next/navigation';

let debounce = require('lodash.debounce');

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
const FetchMore = ({ FollowingList }: { FollowingList?: any }) => {
	const router = useRouter();
	const wasAlreadyReqested = useRef(false);
	const supabase = supabaseBrowser();
	const { posts, setPosts, tabDisplay } = useAppContext();
	const [page, setPage] = useState<number>(0);
	const scrollPercentage = useRef<number>(0);
	const [fetching, setFetching] = useState(false);
	const [turnOff, setTurnOff] = useState<boolean>(false);
	const [user, setUser] = useState<any>(async () => {
		return await supabase.auth.getUser();
	});
	const getFromAndTo = () => {
		const ITEMS_PER_PAGE = 3;
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
		setFetching(false);

		router.refresh();
	};

	const imageUrlHost =
		'https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/postImages/';

	let currentPost: number = 0;
	const re = /(?:\.([^.]+))?$/;
	let imagePrio = false;

	useEffect(() => {
		if (!wasAlreadyReqested.current) {
			getPosts();
		}
		wasAlreadyReqested.current = true;

		const handleScroll = debounce(() => {
			const scrollTop =
				window.scrollY !== undefined
					? window.scrollY
					: (
							document.documentElement ||
							document.body.parentNode ||
							document.body
					  ).scrollTop;
			const scrollHeight =
				document.documentElement.scrollHeight ||
				document.body.scrollHeight;
			const clientHeight =
				document.documentElement.clientHeight ||
				document.body.clientHeight;
			const newScrollPercentage =
				(scrollTop / (scrollHeight - clientHeight)) * 100;
			scrollPercentage.current = newScrollPercentage;

			// Fetch more posts when scroll reaches 98%
			if (
				scrollPercentage.current.valueOf() > 98 &&
				!fetching &&
				!turnOff
			) {
				setFetching(true);
				document.getElementById('fetch')?.click();
			}
		}, 1000);
		const handleResize = () => {
			handleScroll();
		};
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);

		// Initial update of the scroll percentage
		handleScroll();
		handleResize();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wasAlreadyReqested, fetching, scrollPercentage]);

	const runFollowing = async () => {
		let idsForFollowing = FollowingList?.map(
			(item: any) => item.following_id
		);
		const { data } = await supabase
			.from('posts')
			.select(
				'*,images(name),profiles(display_name, handle, image_url, role)'
			)
			.in('post_by', idsForFollowing)
			.order('created_at', { ascending: false });
		if (!data) {
			toast.error('Failed to get posts');
			return;
		}
		const formattedPosts = data.map(createPostObject);
		setPosts((currentPosts: any) => [...currentPosts, ...formattedPosts]);
		setFetching(false);
	};

	useEffect(() => {
		if (tabDisplay === 'Following') {
			setPosts([]);
			runFollowing();
			setFetching(true);
		}
	}, [tabDisplay]);

	const getTest = async () => {
		console.log('hi');
		console.log(tabDisplay);
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
				className="w-full bg-amber-600 my-5 hidden"
				id="fetch"
			>
				Fetch More
			</Button>
			<Button
				onClick={() => {
					getTest();
				}}
				className="w-full bg-amber-600 my-5"
			>
				Fetch More
			</Button>
		</div>
	);
};

export default FetchMore;
