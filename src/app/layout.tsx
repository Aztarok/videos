import QueryProvider from "@/components/query-provider";
import Navbar from "@/components/ui/Navbar";
import PostsMaker from "@/components/ui/PostsMaker";
import Uploader from "@/components/ui/Uploader";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Social Media App",
    description: "Created by Aztarok"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body className="">
                    <QueryProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Navbar />
                            {children}
                            {/* <main className="max-w-screen m-0 ">
                                <div className="flex">
                                    <Navbar />

                                    {children}
                                </div>
                                <Uploader />
                                <PostsMaker up={"1"} down={"0"} />
                            </main> */}
                            <PostsMaker up={"1"} down={"0"} />
                            <Toaster richColors />
                        </ThemeProvider>
                    </QueryProvider>
                </body>
            </html>
        </>
    );
}
