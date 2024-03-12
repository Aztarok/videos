'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/app/Context/store';

const TabSwitch = () => {
	const { tabDisplay, setTabDisplay } = useAppContext();
	const handleClickForYou = () => {
		setTabDisplay('For you');
	};
	const handleClickFollowing = () => {
		setTabDisplay('Following');
	};
	return (
		<>
			<Tabs defaultValue="account" className="w-full h-[53px]">
				<TabsList className="w-full h-full bg-slate-950 rounded-none border-x-[1px] border-b-[1px] border-slate-400 flex justify-evenly relative">
					<TabsTrigger
						value="account"
						onClick={handleClickForYou}
						className="w-full h-full flex flex-col"
					>
						<h1>For You</h1>
						{tabDisplay === 'For you' && (
							<div className="absolute w-1/12 h-[5px] bg-blue-600 rounded-full bottom-0"></div>
						)}
					</TabsTrigger>
					<TabsTrigger
						value="password"
						onClick={handleClickFollowing}
						className="w-full flex flex-col"
					>
						<h1>Following</h1>
						{tabDisplay === 'Following' && (
							<div className="absolute w-1/6 h-[5px] bg-blue-600 rounded-full bottom-0"></div>
						)}
					</TabsTrigger>
				</TabsList>
				{/* <TabsContent value="account">
						Make changes to your account here.
					</TabsContent>
					<TabsContent value="password">
						Change your password here.
					</TabsContent> */}
			</Tabs>
		</>
	);
};

export default TabSwitch;
