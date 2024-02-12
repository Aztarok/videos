import Profile from '@/components/Profile';
import Uploader from '@/components/Uploader';
import { supabaseServer } from '@/lib/supabase/server';
import Image from 'next/image';
import useUserImageUrl from './hook/useUserImageUrl';
import CheckProfile from '@/components/CheckProfile';

interface Post {
	id: any;
	post_by: any;
	image: any;
	description: any;
	image_user: any;
}

const Page = async () => {
	const supabase = supabaseServer();
	const { data } = await supabase
		.from('posts')
		.select('*,profiles(display_name)');

	const posts: Post[] = [];
	async function getPosts() {
		if (data) {
			for (let i = 0; i < data.length; i++) {
				const post = data[i];
				const { data: newOne } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', post.post_by)
					.single();
				posts.push({
					id: post.id,
					post_by: post.post_by,
					image: `https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/${post.post_by}/${post.id}/${post.name}`,
					description: post.description,
					image_user: newOne?.image_url,
				});
			}
		}
	}

	await getPosts();

	// const posts = data?.map((post) => {
	// 	return {
	// 		id: post.id,
	// 		post_by: post.post_by,
	// 		image: `https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/${post.post_by}/${post.id}/${post.name}`,
	// 		description: post.description,
	// 	};
	// https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/074610ae-4939-4b6a-9afa-b5714ec218b4/b570cfd9-a9c4-4301-b39c-6072be6a2ffa/main_Vivian_spec_v2.png
	// https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/b570cfd9-a9c4-4301-b39c-6072be6a2ffa/b570cfd9-a9c4-4301-b39c-6072be6a2ffa/main_Vivian_spec_v2.png
	// });

	return (
		<div>
			<div className="flex flex-wrap justify-center gap-5">
				{/* {posts
					?.map((post, index) => {
						console.log(post.post_by);
						return (
							<div
								key={index}
								className="p-5 bg-slate-700 hover:bg-slate-800 hover:cursor-pointer border-white border-2 rounded-lg w-[75%] flex flex-col justify-center items-center space-y-5"
							>
								<div className="h-16 flex justify-start w-full flex-col mb-20">
									<Profile fade={false} />
									<h1>{post.post_by}</h1>
									<CheckProfile userId={post.post_by} />
								</div>
								<h1 className="text-white text-xl font-medium">
									{post.description}
								</h1>
								<Image
									src={post.image}
									alt="post"
									width={0}
									height={0}
									sizes="100vw"
									style={{ width: `1600px`, height: `auto` }}
									className="object-fill"
								/>
							</div>
						);
					})
					.reverse()} */}
				{posts
					?.map((post, index) => {
						return (
							<div
								key={index}
								className="p-5 bg-slate-800 hover:bg-slate-950 hover:cursor-pointer border-white border-2 rounded-lg w-[75%] flex flex-col justify-center items-center space-y-5"
							>
								<div className="h-8 flex justify-start w-full flex-col">
									<Profile
										fade={false}
										imageNew={post.image_user}
									/>
								</div>
								<h1 className="text-white text-xl font-medium">
									{post.description}
								</h1>
								<Image
									src={post.image}
									alt={`${post.id}`}
									width={0}
									height={0}
									sizes="100vw"
									style={{
										width: '1600px',
										height: 'auto',
									}}
									className="object-fill"
								/>
							</div>
						);
					})
					.reverse()}
			</div>
			<Uploader />
		</div>
	);
};

export default Page;
