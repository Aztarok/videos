import Link from "next/link";
import { Suspense } from "react";
import Profile from "./Profile";
import { Separator } from "./separator";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center h-20">
            <Link href="/">
                <h1 className="text-xl font-bold">Logo</h1>
            </Link>
            <Link href="/videos">
                <h1 className="text-xl font-bold">Videos</h1>
            </Link>
            <div className="w-[50px]">
                <Suspense>
                    <Profile />
                </Suspense>
            </div>
            <Separator className="absolute inset-x-0 mt-20 bg-slate-600" />
        </div>
    );
};

export default Navbar;
