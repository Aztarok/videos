'use client';
import { useAppContext } from '@/app/Context/store';
import { Button } from '@/components/ui/button';
import React from 'react';
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2';

const FollowOrEdit = ({ userCheck }: { userCheck?: string }) => {
	const { state, session } = useAppContext();
	let edit = false;
	if (userCheck === state?.display_name) {
		edit = true;
	}
	return (
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
				</>
			)}
		</div>
	);
};

export default FollowOrEdit;
