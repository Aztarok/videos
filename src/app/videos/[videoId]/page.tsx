import React from 'react';

const Page = ({ params }: { params: { videoId: string } }) => {
	return <div>Wow: {params.videoId}</div>;
};

export default Page;
