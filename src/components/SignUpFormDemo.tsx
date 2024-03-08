"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans
} from "@tabler/icons-react";
import { Label2 } from "./ui/label2";
import { Input2 } from "./ui/input2";
import { cn } from "@/lib/utils";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useAppContext } from "@/app/Context/store";
import { useRouter } from "next/navigation";
type InputRefs = {
    input1: React.MutableRefObject<string | null>;
    input2: React.MutableRefObject<string | null>;
};
export function SignupFormDemo() {
    const { state } = useAppContext();
    const inputRefs: InputRefs = {
        input1: useRef<string>(null),
        input2: useRef<string>(null)
    };
    const router = useRouter();
    const supabase = supabaseBrowser();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const handle = inputRefs.input1.current;
        const display = inputRefs.input2.current;
        console.log(handle, display);
        console.log("Form submitted");
        if (handle) {
            const { count } = await supabase
                .from("profiles")
                .select("handle", { count: "exact" })
                .eq("handle", handle);
            if (count === 0) {
                const { error } = await supabase
                    .from("profiles")
                    .update({ handle: handle, display_name: display })
                    .eq("id", state.id);
                router.replace("/");
                router.refresh();
            }
        }
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        inputId: keyof InputRefs
    ) => {
        inputRefs[inputId].current = event.target.value;
    };
    return (
        <div className="min-w-96 md:min-w-[550px] max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to Aceternity
            </h2>
            <p className="text-neutral-600 text-md max-w-sm mt-2 dark:text-neutral-300">
                Pick a User handle and Display name for yourself
            </p>
            <p className="text-neutral-600 text-md max-w-sm mt-2 dark:text-neutral-300">
                Users handles must be unique while display names can be changed
                whenever you want
            </p>

            {/* TODO: Add moving gradient maybe maybe? */}
            {/* content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: var(--line-width);
    background: conic-gradient(from calc(var(--angle) + var(--start-angle)), transparent 0, var(--line-color) 20%, transparent 25%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: inherit;

    position: absolute;
    inset: 0;
    border-radius: inherit;
    filter: drop-shadow(0 0 10px var(--line-color)); */}
            {/* <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label2 htmlFor="firstname">First name</Label2>
                        <Input2
                            id="firstname"
                            placeholder="Tyler"
                            type="text"
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label2 htmlFor="lastname">Last name</Label2>
                        <Input2
                            id="lastname"
                            placeholder="Durden"
                            type="text"
                        />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label2 htmlFor="email">Email Address</Label2>
                    <Input2
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        type="email"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label2 htmlFor="password">Password</Label2>
                    <Input2
                        id="password"
                        placeholder="••••••••"
                        type="password"
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-8">
                    <Label2 htmlFor="twitterpassword">
                        Your twitter password
                    </Label2>
                    <Input2
                        id="twitterpassword"
                        placeholder="••••••••"
                        type="twitterpassword"
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign up &rarr;
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit"
                    >
                        <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            GitHub
                        </span>
                        <BottomGradient />
                    </button>
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit"
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Google
                        </span>
                        <BottomGradient />
                    </button>
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit"
                    >
                        <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            OnlyFans
                        </span>
                        <BottomGradient />
                    </button>
                </div>
            </form>
        </div> */}
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label2 htmlFor="handle">User Handle</Label2>
                    <Input2
                        id="handle"
                        placeholder="deeznuts123"
                        type="text"
                        onChange={(e) => handleChange(e, "input1")}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label2 htmlFor="display">Display Name</Label2>
                    <Input2
                        id="display"
                        placeholder="Deez Nuts"
                        type="text"
                        onChange={(e) => handleChange(e, "input2")}
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Finish Signup &rarr;
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
