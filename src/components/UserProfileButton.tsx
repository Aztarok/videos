'use client';
import { CustomUser } from '@/lib/types/custom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

const UserProfileButton = ({
	data,
	fade,
}: {
	data: CustomUser;
	fade: boolean;
}) => {
	const pathname = usePathname();
	if (data) {
	}
	const queryString = new URLSearchParams({
		userId: data.id,
		display: data.display_name || '',
		timeMade: data.created_at,
		email: data.email || '',
		imageUrl: data.image_url || '',
	}).toString();
	const profileCheck = pathname.substring(0, pathname.indexOf('/', 1));
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger>
				<>
					{data?.image_url ? (
						<Image
							src={data.image_url || ''}
							alt={data.display_name || ''}
							width={50}
							height={50}
							className={`${
								fade ? 'animate-fade' : ''
							} rounded-full focus:border-none cursor-pointer outline-none`}
						/>
					) : (
						<div className="h-[50px] w-[50px] flex items-center justify-center rounded-full text-2xl font-bold cursor-pointer">
							<h1>{data?.email && data.email[0]}</h1>
						</div>
					)}
				</>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{`@${data.display_name}`}</DropdownMenuLabel>
				<DropdownMenuItem className="text-slate-300">
					<h1>0 Followers</h1>
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-white" />
				<DropdownMenuItem asChild>
					<Link
						href={`${
							profileCheck === '/profile'
								? data.display_name
								: `profile/${data.display_name}`
						}`}
						className="cursor-pointer"
					>
						Profile
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfileButton;
