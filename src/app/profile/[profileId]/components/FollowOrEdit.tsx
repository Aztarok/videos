'use client';
import { useAppContext } from '@/app/Context/store';

import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2';
interface FollowData {
	follower_id: string;
	following_id: string;
}

const FollowOrEdit = ({
	userCheck,
	userData,
	followersTotal,
	followingTotal,
}: {
	userCheck?: string;
	userData: any;
	followersTotal: any;
	followingTotal: any;
}) => {
	const router = useRouter();
	const { state } = useAppContext();
	const supabase = supabaseBrowser();
	let edit = false;
	if (userCheck === state?.handle) {
		edit = true;
	}
	const [followed, setFollowed] = useState(false);
	const [followers, setFollowers] = useState<any>(followersTotal?.size);
	const [following] = useState<number>(followingTotal?.size);
	const [totalFollowers, setTotalFollowers] = useState<string[]>(
		Array.from(followersTotal)
	);
	const [totalFollowing, setTotalFollowing] = useState<string[]>(
		Array.from(followingTotal)
	);

	let displayFollows = false;
	if (state?.id === userData?.id) {
		displayFollows = true;
	}

	const editProfile = () => {
		router.refresh();
	};
	const follow = async () => {
		// if (followed) {
		// 	console.log('Already following this user');
		// 	return;
		// }

		// const { data, error } = await supabase
		// 	.from('Follows')
		// 	.insert({ follower_id: state.id, following_id: userData.id });
		// followed = true;
		// if (followersDataNum > 0) {
		// 	setFollowersDataNum(followersDataNum + 1);
		// }
		// router.refresh();
		try {
			// Optimistic update
			// setFollowersDataNum(
			//     (prevFollowersDataNum) => prevFollowersDataNum + 1
			// );
			setFollowers((prev: number) => prev + 1);
			// Perform API call
			await supabase
				.from('Follows')
				.insert({ follower_id: state.id, following_id: userData.id });

			setFollowed(true);
		} catch (error) {
			// Revert the state back if the API call fails
			// setFollowersDataNum(
			//     (prevFollowersDataNum) => prevFollowersDataNum - 1
			// );
			setFollowers((prev: number) => prev - 1);
			console.error('Failed to follow user:', error);
		}
	};

	const unfollow = async () => {
		// const { data, error } = await supabase
		// 	.from('Follows')
		// 	.delete()
		// 	.eq('follower_id', state.id)
		// 	.eq('following_id', userData.id);
		// followed = false;
		// if (followersDataNum > 0) {
		// 	setFollowersDataNum(followersDataNum - 1);
		// }
		// router.refresh();
		try {
			// Optimistic update
			// setFollowersDataNum(
			//     (prevFollowersDataNum) => prevFollowersDataNum - 1
			// );
			setFollowers((prev: number) => prev - 1);
			// Perform API call
			await supabase
				.from('Follows')
				.delete()
				.eq('follower_id', state.id)
				.eq('following_id', userData.id);

			setFollowed(false);
		} catch (error) {
			// Revert the state back if the API call fails
			// setFollowersDataNum(
			//     (prevFollowersDataNum) => prevFollowersDataNum + 1
			// );
			setFollowers((prev: number) => prev + 1);
			console.error('Failed to unfollow user:', error);
		}
	};

	useEffect(() => {
		if (followersTotal.has(state?.id)) {
			setFollowed(true);
		}
	}, [followersTotal, state?.id]);

	return (
		<>
			<div className="w-full h-[68px] flex justify-end gap-2 pt-2">
				{edit ? (
					<>
						<Button
							className="bg-gray-600 mr-5 rounded-full px-5"
							variant="ghost2"
							onClick={editProfile}
						>
							<h1 className="text-md font-bold">Edit Profile</h1>
						</Button>
					</>
				) : (
					<>
						<Button
							className="rounded-full relative border-[1px] border-slate-400 w-10 h-10 text-lg"
							variant="none"
						>
							<HiMiniEllipsisHorizontal className="absolute" />
						</Button>
						{followed ? (
							<>
								<Button
									onClick={unfollow}
									className="bg-gray-600 mr-5 rounded-full px-5"
									variant="ghost2"
								>
									<h1 className="text-md font-bold">
										Unfollow
									</h1>
								</Button>
							</>
						) : (
							<Button
								onClick={follow}
								className="bg-gray-600 mr-5 rounded-full px-5"
								variant="ghost2"
							>
								<h1 className="text-md font-bold">Follow</h1>
							</Button>
						)}
					</>
				)}
			</div>
			<div className="p-4 relative h-full">
				<div>{userData?.display_name}</div>
				<div>{`@${userData?.handle}`}</div>
				<div className="w-full flex gap-5 absolute bottom-0">
					<div>{<div>{`${following} Following`}</div>}</div>
					{followers === 1 ? (
						<div>{<div>{`${followers} Follower`}</div>}</div>
					) : (
						<div>{<div>{`${followers} Followers`}</div>}</div>
					)}
				</div>
			</div>
		</>
	);
};

export default FollowOrEdit;
