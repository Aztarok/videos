import UserProfile from "@/components/UserProfile";
import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase/server";

const Page = async ({ searchParams }: { searchParams: any }) => {
    const supabase = supabaseServer();
    const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", searchParams.video_id);
    const vidya = data![0];
    const id = searchParams.video_id;
    const baseUrl =
        "https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/";
    return (
        <div>
            <video controls className="w-full rounded-lg">
                <source
                    src={`${baseUrl}${vidya.post_by}/${id}/${vidya.name}`}
                />
            </video>
            <div className="mt-10 flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-muted-foreground">
                    Comments
                </h1>
                <Separator />
                <div className="bg-slate-800 flex flex-col w-full justify-start min-h-96 rounded-md">
                    <div className="flex mt-2">
                        <div className="ml-2">
                            <UserProfile user_id={vidya.post_by} />
                        </div>

                        <form className="ml-4 w-full flex">
                            <input
                                placeholder="Your comment"
                                className="rounded-md p-1 pl-2 h-10 self-center w-full mr-2"
                            />
                        </form>
                    </div>
                    <Separator className="bg-white max-w-[95%] rounded-xl self-center h-1.5 mt-2" />
                </div>
            </div>
        </div>
    );
};

export default Page;
