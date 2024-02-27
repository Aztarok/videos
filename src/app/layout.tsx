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
import { GlobalContextProvider } from "./Context/store";

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
                <body className="flex m-0 overflow-y-scroll">
                    <QueryProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <GlobalContextProvider>
                                <Navbar />
                                {children}
                            </GlobalContextProvider>
                            <PostsMaker up={"1"} down={"0"} />
                            <Toaster richColors />
                        </ThemeProvider>
                    </QueryProvider>
                </body>
            </html>
        </>
    );
}
