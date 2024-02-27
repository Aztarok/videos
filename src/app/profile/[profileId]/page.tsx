import FetchPosts from "@/components/Posts/FetchPosts";
import { Button } from "@/components/ui/button";
import { CustomUser } from "@/lib/types/custom";
import { headers } from "next/headers";

const Page = () => {
    let profilePath;
    const headersList = headers();
    const header_url = headersList.get("x-url") || "";
    const pathname = headersList.get("x-pathname");
    const origin_url = headersList.get("x-origin");
    if (pathname) {
        profilePath = decodeURI(
            pathname.substring(pathname.indexOf("/", 2) + 1)
        );
    }

    return (
        <div>
            <div>
                <FetchPosts userName={profilePath} />
            </div>
        </div>
    );
};

export default Page;
