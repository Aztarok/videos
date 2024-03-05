import React from 'react';

interface VideoProps {
	videoUrl: string;
	aspectRatio: number;
}

const VideoComponent: React.FC<VideoProps> = ({ videoUrl, aspectRatio }) => {
	let containerStyle: React.CSSProperties = {
		position: 'relative',
		width: '100%',
		height: 0,
	};

	if (aspectRatio === 1 / 2) {
		// Double the aspect ratio for 1/2
		containerStyle = {
			...containerStyle,
			paddingBottom: `${aspectRatio * 400}%`,
		};
	} else {
		// Regular aspect ratio calculation
		containerStyle = {
			...containerStyle,
			paddingBottom: `${aspectRatio * 100}%`,
		};
	}

	const videoStyle: React.CSSProperties = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		objectFit: 'cover', // Maintain aspect ratio
	};

	return (
		<div style={containerStyle}>
			<video
				controls
				className="absolute inset-0 w-full h-full"
				style={videoStyle}
			>
				<source src={videoUrl} type="video/mp4" />
			</video>
		</div>
	);
};

export default VideoComponent;
