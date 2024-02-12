import Profile from '@/components/Profile';
import { supabaseServer } from '@/lib/supabase/server';
import { Post } from '@/lib/types/custom';
import Image from 'next/image';

const FetchPosts = async ({ variant }: { variant?: any }) => {
	const supabase = supabaseServer();
	const { data } = await supabase
		.from('posts')
		.select('*,profiles(display_name)');

	const posts: Post[] = [];
	const { data: user } = await supabase.auth.getUser();
	async function getPosts() {
		if (data) {
			for (let i = 0; i < data.length; i++) {
				const post = data[i];
				const { data: newOne } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', post.post_by)
					.single();
				if (variant === 'profile') {
					if (post.post_by === user.user?.id) {
						posts.push({
							id: post.id,
							post_by: post.post_by,
							image: `https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/${post.post_by}/${post.id}/${post.name}`,
							description: post.description,
							image_user: newOne?.image_url,
						});
					}
				} else {
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
	}
	await getPosts();

	return (
		<div>
			<div className="flex flex-wrap justify-center gap-5">
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
		</div>
	);
};

export default FetchPosts;
