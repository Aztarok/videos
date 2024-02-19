import Link from "next/link";
import { Suspense } from "react";
import Profile from "./Profile";
import { Separator } from "./ui/separator";

const Navbar = () => {
    return (
        <div className="absolute w-[99.4vw] inset-x-0 inset-y-0 z-50">
            <div className="inset-x-0 inset-y-0 sticky flex justify-center items-center h-20 bg-slate-900">
                <div className="relative w-screen flex items-center justify-between max-w-6xl">
                    <Link href="/">
                        <h1 className="text-xl font-bold">Logo</h1>
                    </Link>
                    <Link href="/videos">
                        <h1 className="text-xl font-bold">Videos</h1>
                    </Link>
                    <Suspense>
                        <Profile />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
