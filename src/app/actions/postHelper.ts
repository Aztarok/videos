'use server';
import { supabaseServer } from '@/lib/supabase/server';

const supabase = supabaseServer();
export default async function postHelper() {
	'use server';
	const { data } = await supabase
		.from('posts')
		.select(
			'*,images(name),profiles(display_name, handle, image_url, role)'
		)
		.range(0, 0)
		.order('created_at', { ascending: false });
	return data;
}
