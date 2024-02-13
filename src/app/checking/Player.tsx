// import dynamic from 'next/dynamic';
// import { FilePlayerProps } from 'react-player/file';
// import { twMerge } from 'tailwind-merge';

// const ReactPlayer = dynamic(
// 	() => import('react-player/file').then((ReactPlayer) => ReactPlayer),
// 	{
// 		ssr: false,
// 	}
// );

// type VideoPlayerProps = FilePlayerProps & {
// 	className?: string;
// };

// export const VideoPlayer = ({ className, ...rest }: VideoPlayerProps) => {
// 	return (
// 		<div className={twMerge('aspect-video', className)}>
// 			<ReactPlayer
// 				width="100%"
// 				height="100%"
// 				url={'https://www.youtube.com/watch?v=5DEdR5lqnDE'}
// 			/>
// 		</div>
// 	);
// };

'use client';

import ReactPlayer from 'react-player';

export const Player = (props: any) => {
	return <ReactPlayer {...props} />;
};
