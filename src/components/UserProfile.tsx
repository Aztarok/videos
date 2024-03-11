"use client";
import { useAppContext } from "@/app/Context/store";
import UserProfileButton from "./UserProfileButton";

export default function UserProfile({
    fade = false,
    imageNew,
    display_name,
    handle
}: {
    fade?: boolean;
    imageNew?: string;
    display_name: string;
    handle?: string;
}) {
    const { state } = useAppContext();
    const dataObj = {
        display_name: handle,
        handle: handle,
        image_url: imageNew
    };
    return (
        <div>
            {state?.id ? <UserProfileButton data={dataObj} fade={fade} /> : ""}
        </div>
    );
}
