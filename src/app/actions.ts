import { revalidatePath } from 'next/cache';

export default async function authCheck() {
	revalidatePath('/');
}
