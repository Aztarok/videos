"use server";
import { revalidatePath } from "next/cache";

export default async function authCheck() {
    revalidatePath("/");
}

export async function getMediaData({ imageData }: { imageData: string }) {
    "use server";
    const link = (await process.env.BUCKET_URL) + imageData;
    return link;
}
