import FetchPosts from "@/components/FetchPosts";
import { Button } from "@/components/ui/button";
import { CustomUser } from "@/lib/types/custom";
import { headers } from "next/headers";

const Page = () => {
    const headersList = headers();
    const header_url = headersList.get("x-url") || "";
    const pathname = headersList.get("x-pathname");
    const origin_url = headersList.get("x-origin");
    const profilePath = pathname.substring(pathname.indexOf("/", 2) + 1);

    console.log(header_url);
    console.log(pathname);
    console.log(origin_url);
    console.log(profilePath);

    return (
        <div>
            <div>
                <FetchPosts />
            </div>
        </div>
    );
};

export default Page;
