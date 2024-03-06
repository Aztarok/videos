'use client';

import { supabaseBrowser } from '@/lib/supabase/browser';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const initUser = {
	created_at: '',
	display_name: '',
	email: '',
	id: '',
	image_url: '',
};

const useFollowers = ({ userWho }: { userWho?: any }) => {
	return useQuery({
		queryKey: ['followers'],
		queryFn: async () => {
			const supabase = await supabaseBrowser();
			const { data } = await supabase.auth.getSession();
			if (data.session?.user) {
				const { data: followers } = await supabase
					.from('Follows')
					.select('follower_id')
					.eq('following_id', userWho.id);

				console.log('followers', followers);
				return followers;
			}
			return initUser;
		},
	});
};

export default useFollowers;
