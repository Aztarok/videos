import FetchMore from "@/components/Posts/FetchMore";
import HomePage from "@/components/Posts/HomePage";
import TabSwitch from "@/components/TabSwitch";
import { headers } from "next/headers";

const Page = async () => {
    const headersList = headers();
    let following: any = headersList.get("followingBruh");
    following = Array.from(new Set(JSON.parse(following!)));
    return (
        <div className="">
            <div className="w-full">
                <TabSwitch />
            </div>
            {/* <FetchMore FollowingList={following} /> */}
            <HomePage FollowingList={following} />
        </div>
    );
};

export default Page;
