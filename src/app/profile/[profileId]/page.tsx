import FetchPosts from '@/components/Posts/FetchPosts';
import { Button } from '@/components/ui/button';
import { supabaseServer } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2';
import RouterBack from './components/RouterBack';
import { VscEllipsis } from 'react-icons/vsc';
import FollowOrEdit from './components/FollowOrEdit';
const Page = async ({ params }: { params: string }) => {
	let profilePath;
	const headersList = headers();
	const header_url = headersList.get('x-url') || '';
	const pathname = headersList.get('x-pathname');
	const origin_url = headersList.get('x-origin');
	const supabase = supabaseServer();
	let numPosts: number;
	if (!pathname || !origin_url || !header_url) {
		throw Error;
	}
	profilePath = decodeURI(pathname.substring(pathname.indexOf('/', 2) + 1));

	const { data: userData } = await supabase
		.from('profiles')
		.select('*,posts(*)')
		.eq('display_name', profilePath)
		.single();
	// const { data: numPost } = await supabase
	// 	.from('posts')
	// 	.select('*', { count: 'exact' })
	// 	.eq('post_by', userData?.id);
	numPosts = Number(userData?.posts.length);

	return (
		<div className="relative ">
			<div className="w-full h-[53px] flex items-center border-[1px] border-slate-400 border-t-0">
				<RouterBack />

				<div className="flex flex-col ml-5">
					<h1 className="font-bold text-xl">{profilePath}</h1>
					{numPosts !== undefined && (
						<h1 className="text-xs text-gray-400 font-semibold">
							{numPosts} posts
						</h1>
					)}
				</div>
			</div>
			<div className="w-full h-[200px] bg-gray-600 border-[1px] border-slate-400 border-t-0"></div>
			<div className=""></div>
			<div className="w-full h-auto border-x-[1px] border-slate-400">
				<div className="w-full h-[265px] flex flex-col">
					<FollowOrEdit userCheck={profilePath} />
					<div></div>
				</div>
				<div className="w-full h-[53px]"></div>
			</div>
			<div>
				<FetchPosts userName={profilePath} />
			</div>
		</div>
	);
};

export default Page;
