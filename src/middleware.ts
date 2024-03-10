import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { protectedPaths } from "./lib/constant";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers
        }
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers
                        }
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: "",
                        ...options
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers
                        }
                    });
                    response.cookies.set({
                        name,
                        value: "",
                        ...options
                    });
                }
            }
        }
    );
    const pathToUser = request.url.split("/");
    const { data } = await supabase.auth.getSession();
    const url = new URL(request.url);
    // if (!data) {
    //     if (protectedPaths.includes(url.pathname)) {
    //         return NextResponse.redirect(
    //             new URL("/auth?next=" + url.pathname, request.url)
    //         );
    //     }
    //     if (pathToUser.includes(url.pathname)) {
    //         return NextResponse.redirect(
    //             new URL("/auth?next=" + url.pathname, request.url)
    //         );
    //     }
    //     return response;
    // }
    if (data.session) {
        const id = data.session.user?.id;

        const { data: user } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();
        if (!user.handle) {
            if (url.pathname === "/somepage") {
                return response;
            } else {
                return NextResponse.redirect(new URL("/somepage", request.url));
            }
        }
        if (url.pathname === "/auth" || url.pathname! === "/somepage") {
            return NextResponse.redirect(new URL("/", request.url));
        } else {
            const origin = url.origin;
            const pathname = url.pathname;
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set("x-url", request.url);
            requestHeaders.set("x-origin", origin);
            requestHeaders.set("x-pathname", pathname);

            if (pathToUser.includes("profile")) {
                const userHandle = pathToUser.pop();
                const { data: userData } = await supabase
                    .from("profiles")
                    .select("*,posts(*)")
                    .eq("handle", userHandle)
                    .single();
                const { data: followers } = await supabase
                    .from("Follows")
                    .select("follower_id")
                    .eq("following_id", userData?.id);
                const { data: following } = await supabase
                    .from("Follows")
                    .select("following_id")
                    .eq("follower_id", userData?.id);
                const followers2 = followers?.map((item) => item.follower_id);
                const following2 = following?.map((item) => item.following_id);
                requestHeaders.set("followingBruh", JSON.stringify(following2));
                requestHeaders.set("followersBruh", JSON.stringify(followers2));
            }

            return NextResponse.next({
                request: {
                    headers: requestHeaders
                }
            });
        }
    } else {
        if (
            protectedPaths.includes(url.pathname) ||
            pathToUser.includes("profile")
        ) {
            return NextResponse.redirect(
                new URL("/auth?next=" + url.pathname, request.url)
            );
        }
        return response;
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
        "/profile/:profileId*"
    ]
};
