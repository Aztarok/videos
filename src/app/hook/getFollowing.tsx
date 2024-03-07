'use client';

import { supabaseBrowser } from '@/lib/supabase/browser';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import authCheck from '../actions';

const initUser = {
	created_at: '',
	display_name: '',
	email: '',
	id: '',
	image_url: '',
};

const useFollowing = ({ userWho }: { userWho?: any }) => {
	return useQuery({
		queryKey: ['following'],
		queryFn: async () => {
			const supabase = await supabaseBrowser();
			const { data: followersData } = await supabase
				.from('Follows')
				.select('following_id')
				.eq('follower_id', userWho.id);
			const followingIDs = followersData?.map((follower) =>
				follower.following_id.toString()
			);
			return followingIDs;
		},
	});
};

export default useFollowing;
