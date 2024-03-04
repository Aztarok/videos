import React from 'react';

const VideoComponent = ({ videoUrl }: { videoUrl: string }) => {
	return (
		<video controls className="">
			<source src={videoUrl} type="video/mp4" />
		</video>
	);
};

export default VideoComponent;
