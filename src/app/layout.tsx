import QueryProvider from '@/components/query-provider';
import Navbar from '@/components/ui/Navbar';
import PostsMaker from '@/components/ui/PostsMaker';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import { AppWrapper } from './Context/store';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Social Media App',
	description: 'Created by Aztarok',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const requestUrl = headers().get('x-url');
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body className="flex bg-slate-900">
					<QueryProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="dark"
							enableSystem
							disableTransitionOnChange
						>
							<AppWrapper>
								{requestUrl !==
									'http://localhost:3000/profile' &&
								requestUrl !==
									'http://localhost:3000/somepage' &&
								requestUrl !== null ? (
									<Navbar />
								) : null}
								{children}
								<Suspense>
									<PostsMaker />
								</Suspense>
							</AppWrapper>
							<Toaster richColors />
						</ThemeProvider>
					</QueryProvider>
				</body>
			</html>
		</>
	);
}
