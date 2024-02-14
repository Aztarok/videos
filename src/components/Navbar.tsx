import React, { Suspense } from 'react';
import Profile from './Profile';
import Link from 'next/link';

const Navbar = () => {
	return (
		<div className="flex justify-between items-center h-20">
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
	);
};

export default Navbar;
