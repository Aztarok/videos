'use client';

import useUserImageUrl from '@/app/hook/useUserImageUrl';
import React, { useEffect } from 'react';
import Profile from './Profile';

const CheckProfile = (userId: any) => {
	const useHandleImageUrl = (userId: any) => {
		const { data } = useUserImageUrl(userId['userId']);

		return data?.image_url;
	};

	return (
		<div>
			{useHandleImageUrl(userId)}
			{userId['userId']}
		</div>
	);
};

export default CheckProfile;
