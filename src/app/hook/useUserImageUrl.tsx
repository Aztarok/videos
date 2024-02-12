'use client';

// Import necessary dependencies
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

// Define initial user data
const initUser = {
	created_at: '',
	display_name: '',
	email: '',
	id: '',
	image_url: '',
};

// Custom hook to fetch user data
const useUserImageUrl = (userId: any) => {
	// const supabase = await supabaseBrowser();
	// const { data } = await supabase
	// 	.from('profiles')
	// 	.select('*,image_url')
	// 	.eq('id', userId)
	// 	.single();
	// console.log(data?.image_url);
	return useQuery({
		queryKey: ['user'], // Include userId in the query key
		queryFn: async () => {
			const supabase = await supabaseBrowser();
			const { data } = await supabase.auth.getSession();
			console.log(userId);
			console.log(JSON.stringify(userId));
			if (data.session?.user) {
				const { data } = await supabase
					.from('profiles')
					.select('*') // Select only the image_url column
					.eq('id', JSON.stringify(userId))
					.single();
				console.log(data);
				return data; // Return the image_url
			}
			// Fetch user profile data
		},
	});
};

export default useUserImageUrl;
