import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="flex gap-5">
			<Button>Hello World</Button>
			<Button asChild>
				<Link className="w-64 bg-red-50" href="/auth">
					Sign In
				</Link>
			</Button>
		</div>
	);
}
