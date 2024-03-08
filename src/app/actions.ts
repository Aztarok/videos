import { revalidatePath } from "next/cache";

export default async function authCheck(pathname: string) {
    revalidatePath(pathname);
}
