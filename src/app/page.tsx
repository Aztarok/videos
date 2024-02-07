import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="flex gap-5">
			<Link href="/dashboard">/Dashboard</Link>
			<Link href="/profile">/Profile</Link>
		</div>
	);
}
