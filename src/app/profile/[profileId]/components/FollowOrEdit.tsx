'use client';
import { useAppContext } from '@/app/Context/store';

import useFollowers from '@/app/hook/getFollowers';
import useFollowing from '@/app/hook/getFollowing';
import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2';
interface FollowData {
	follower_id: string;
	following_id: string;
}

const FollowOrEdit = ({
	userCheck,
	userData,
	mine,
}: {
	userCheck?: string;
	userData: any;
	mine: any;
}) => {
	const router = useRouter();
	const { state, session, following: followDatas } = useAppContext();
	const supabase = supabaseBrowser();
	let edit = false;
	if (userCheck === state?.display_name) {
		edit = true;
	}

	const { data: followersData } = useFollowers({ userWho: userData });
	const { data: followingData } = useFollowing({ userWho: userData });
	const following = new Set(followingData);

	let displayFollows = false;
	if (state?.id === userData.id) {
		displayFollows = true;
	}

	// const following = new Set(followingData);
	// const following = new Set(
	// 	followingData?.filter(
	// 		(item, index) => followingData.indexOf(item) === index
	// 	)
	// );
	// useEffect(() => {
	// 	const checkIfFollowing = async () => {
	// 		// Query the database to check if the user is following userData
	// 		const { data: existingFollow } = await supabase
	// 			.from('Follows')
	// 			.select('*')
	// 			.eq('follower_id', state.id)
	// 			.eq('following_id', userData.id);
	// 		// Update the state based on the result
	// 		return existingFollow; // Convert existingFollow to a boolean value
	// 	};
	// 	const getData = async () => {
	// 		// Call the function to check if the user is following on page load
	// 		let existsValue = await checkIfFollowing();
	// 		setExist(!!existsValue);
	// 	};
	// 	getData();
	// }, [userData.id, state]); // Run the effect whenever userData.id changes (i.e., on page load)
	let followed = false;

	if (mine.has(userData.id)) {
		console.log('1');
		followed = true;
	} else {
		console.log('2');
	}
	const follow = async () => {
		console.log('hi');
		// if (existingData) {
		// 	console.log('Already following this user');
		// 	return;
		// }

		// const { data, error } = await supabase
		// 	.from('Follows')
		// 	.insert({ follower_id: state.id, following_id: userData.id });
		router.refresh();
	};

	const unfollow = async () => {};

	return (
		<>
			<div className="w-full h-[68px] flex justify-end gap-2 pt-2">
				{edit ? (
					<Button
						className="bg-gray-600 mr-5 rounded-full px-5"
						variant="ghost2"
						onClick={() => console.log(followDatas)}
					>
						<h1 className="text-md font-bold">Edit Profile</h1>
					</Button>
				) : (
					<>
						<Button
							className="rounded-full relative border-[1px] border-slate-400 w-10 h-10 text-lg"
							variant="none"
						>
							<HiMiniEllipsisHorizontal className="absolute" />
						</Button>
						{followed ? (
							<Button
								onClick={unfollow}
								className="bg-gray-600 mr-5 rounded-full px-5"
								variant="ghost2"
							>
								<h1 className="text-md font-bold">Unfollow</h1>
							</Button>
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
				<div>{`@${userData?.display_name}`}</div>
				<div className="w-full flex gap-5 absolute bottom-0">
					<div>
						{displayFollows ? (
							<div>
								{mine instanceof Set && (
									<div>{`${mine.size} Following`}</div>
								)}
							</div>
						) : (
							<div>
								{following instanceof Set && (
									<div>{`${following.size} Following`}</div>
								)}
							</div>
						)}
					</div>
					<div>
						{Array.isArray(followersData) && (
							<div>{`${followersData.length} Followers`}</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default FollowOrEdit;
