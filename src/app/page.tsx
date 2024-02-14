import DeletePost from '@/components/DeletePost';
import { supabaseServer } from '@/lib/supabase/server';
import Image from 'next/image';

const Page = async () => {
	const supabase = supabaseServer();
	const { data } = await supabase
		.from('posts')
		.select('*,profiles(display_name)')
		.order('created_at', { ascending: false });
	const imageUrlHost =
		'https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/';
	const posts = data?.map((post) => {
		return {
			image: `${post.post_by}/${post.id}/${post.name}`,
			...post,
		};
	});
	const re: any = /(?:\.([^.]+))?$/;
	return (
		<div>
			<div className="grid grid-cols-3 gap-10">
				{posts?.map((post) => {
					let ext: string | null | undefined = re.exec(post.name)[1];

					return (
						<div
							key={post.id}
							className="rounded-md w-full space-y-5 relative"
						>
							<h1>@{post.profiles?.display_name}</h1>
							<div className="w-full h-96 relative rounded-md border-2 flex">
								{ext === 'mp4' ? (
									<video
										controls
										className="rounded-md object-cover object-center"
									>
										<source
											src={imageUrlHost + post.image}
										/>
									</video>
								) : (
									<Image
										src={imageUrlHost + post.image}
										alt={post.description || ''}
										fill
										className="rounded-md object-cover object-center"
									/>
								)}
							</div>
							<DeletePost
								post_by={post.post_by}
								image={post.image}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Page;
