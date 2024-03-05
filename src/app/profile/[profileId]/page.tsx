import FetchPosts from '@/components/Posts/FetchPosts';
import UserProfile from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { supabaseServer } from '@/lib/supabase/server';
import { CustomUser } from '@/lib/types/custom';
import { headers } from 'next/headers';
import { FaArrowLeftLong } from 'react-icons/fa6';
const Page = async ({ params }: { params: string }) => {
	let profilePath;
	const headersList = headers();
	const header_url = headersList.get('x-url') || '';
	const pathname = headersList.get('x-pathname');
	const origin_url = headersList.get('x-origin');
	if (pathname) {
		profilePath = decodeURI(
			pathname.substring(pathname.indexOf('/', 2) + 1)
		);
		const supabase = supabaseServer();
		// const { data: userData } = await supabase
		// 	.from('profiles')
		// 	.select('*')
		// 	.eq('display_name', profilePath)
		// 	.single();
	}
	return (
		<div className="relative">
			<div className="w-full h-[53px] flex items-center border-[2px] border-t-0">
				<Button className="h-full rounded-none" variant="none">
					<FaArrowLeftLong />
				</Button>
				<div className="flex flex-col">
					<h1>{profilePath}</h1>
					<h1>{1} posts</h1>
				</div>
			</div>
			<div className="w-full h-[200px] bg-gray-600"></div>
			<div className=""></div>
			<div></div>
			<div>
				<FetchPosts userName={profilePath} />
			</div>
		</div>
	);
};

export default Page;
