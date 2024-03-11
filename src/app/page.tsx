import FetchMore from '@/components/Posts/FetchMore';
import TabSwitch from '@/components/TabSwitch';

const Page = async () => {
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
