import FetchPosts from '@/components/Posts/FetchPosts';
import TabSwitch from '@/components/TabSwitch';

const Page = async () => {
	return (
		<div className="">
			<div className="w-full">
				<TabSwitch />
			</div>
			<FetchPosts />
		</div>
	);
};

export default Page;
