'use client';
import { useAppContext } from '@/app/Context/store';
import useFollowers from '@/app/hook/getFollowers';
import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';
import React, { useEffect, useState } from 'react';
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2';
interface FollowData {
	follower_id: string;
	following_id: string;
}

const FollowOrEdit = ({
	userCheck,
	userData,
}: {
	userCheck?: string;
	userData: any;
}) => {
	const { state, session } = useAppContext();
	const supabase = supabaseBrowser();
	let edit = false;
	if (userCheck === state?.display_name) {
		edit = true;
	}
	console.log(userData);
	const { data: followersData } = useFollowers({ userWho: userData });

	if (!state || !session) {
		return null;
	}

	return (
		<>
			<div className="w-full h-[68px] flex justify-end gap-2 pt-2">
				{edit ? (
					<Button
						className="bg-gray-600 mr-5 rounded-full px-5"
						variant="ghost2"
						onClick={() => console.log(state, session)}
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
						<Button
							className="bg-gray-600 mr-5 rounded-full px-5"
							variant="ghost2"
						>
							<h1 className="text-md font-bold">Follow</h1>
						</Button>
						<Button
							className="bg-gray-600 mr-5 rounded-full px-5"
							variant="ghost2"
						>
							<h1 className="text-md font-bold">Follow</h1>
						</Button>
					</>
				)}
			</div>
			<div className="p-4">
				<div>{userData?.display_name}</div>
				<div>{`@${userData?.display_name}`}</div>
				{Array.isArray(followersData) && (
					<div>{`${followersData.length} Followers`}</div>
				)}
			</div>
		</>
	);
};

export default FollowOrEdit;
