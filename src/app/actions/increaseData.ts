'use server';
import { supabaseServer } from '@/lib/supabase/server';

const supabase = supabaseServer();
export default async function increaseData(start: number, end: number) {
	'use server';
	const { data } = await supabase
		.from('posts')
		.select(
			'*,images(name),profiles(display_name, handle, image_url, role)'
		)
		.range(start, end)
		.order('created_at', { ascending: false });
	return data;
}
