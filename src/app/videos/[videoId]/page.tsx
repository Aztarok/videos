import FetchPosts from '@/components/FetchPosts';
import React from 'react';

const Page = ({ params }: { params: { videoId: string } }) => {
	const baseUrl =
		'https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/';
	return (
		<div>
			Wow: {params.videoId}
			<div>hi</div>
		</div>
	);
};

export default Page;
