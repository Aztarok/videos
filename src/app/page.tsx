import FetchPosts from '@/components/FetchPosts';
import Profile from '@/components/Profile';
import { supabaseServer } from '@/lib/supabase/server';
import { Post } from '@/lib/types/custom';
import Image from 'next/image';

const Page = async () => {
	return <FetchPosts />;
};

export default Page;
