import { useSearchParams } from "next/navigation";

const Page = ({ searchParams }: { searchParams: any }) => {
    const id = searchParams.video_id;
    const name = searchParams.video_name;
    const poster = searchParams.post_by;
    const baseUrl =
        "https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/";
    return (
        <div>
            <video controls className="w-full">
                <source src={`${baseUrl}${poster}/${id}/${name}`} />
            </video>
        </div>
    );
};

export default Page;
