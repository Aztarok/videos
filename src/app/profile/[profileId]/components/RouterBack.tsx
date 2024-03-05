'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';

const RouterBack = () => {
	const router = useRouter();
	const handleClick = () => {
		router.back();
	};
	return (
		<Button
			onClick={handleClick}
			className="h-full rounded-none"
			variant="none"
		>
			<FaArrowLeftLong className="text-xl" />
		</Button>
	);
};

export default RouterBack;
