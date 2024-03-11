import FetchMore from '@/components/Posts/FetchMore';
import TabSwitch from '@/components/TabSwitch';
import { supabaseServer } from '@/lib/supabase/server';

const Page = async () => {
	const supabase = supabaseServer();
	const { data } = await supabase
		.from('posts')
		.select(
			'*,images(name),profiles(display_name, handle, image_url, role)'
		)
		.order('created_at', { ascending: false });

	return (
		<div className="">
			<div className="w-full">
				<TabSwitch />
			</div>
			<FetchMore />
		</div>
	);
};

export default Page;
