import { SignupFormDemo } from "@/components/SignUpFormDemo";
import { Input2 } from "@/components/ui/input2";
import React from "react";

const Page = () => {
    return (
        <div className="w-full flex justify-center h-screen relative">
            <div className="absolute sm:bottom-1/2 ">
                <SignupFormDemo />
            </div>
        </div>
    );
};

export default Page;
