// import { supabaseServer } from "@/lib/supabase/server";
// import FetchThumbnail from "./components/FetchThumbnail";

// const Page = async () => {
//     const supabase = supabaseServer();
//     const rows: any[] = [];
//     let currentRow: any[] = [];
//     const baseUrl =
//         "https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/";
//     const { data } = await supabase
//         .from("posts")
//         .select("*,profiles(id, display_name)")
//         .order("created_at", { ascending: false })
//         .filter("type", "like", "video/%");
//     const posts: any[] = [];
//     async function getVideos() {
//         if (data) {
//             for (let i = 0; i < data.length; i++) {
//                 const post = data[i];
//                 const { data: newOne } = await supabase
//                     .from("profiles")
//                     .select("*")
//                     .eq("id", post.post_by)
//                     .single();

//                 posts.push({
//                     id: post.id,
//                     name: post.name,
//                     object_id: post.object_id,
//                     post_by: post.post_by,
//                     image: `${baseUrl}${post.post_by}/${post.id}/${post.name}`,
//                     description: post.description,
//                     image_user: newOne?.image_url,
//                     profile: {
//                         user_id: post.profiles?.id,
//                         display_name: post.profiles?.display_name
//                     }
//                 });
//             }
//         }
//         for (let i = 0; i < posts.length; i++) {
//             currentRow.push(posts[i]);
//             if (currentRow.length === 4 || i === posts.length - 1) {
//                 rows.push(currentRow);
//                 currentRow = [];
//             }
//         }
//     }
//     await getVideos();
//     // const [seen, setSeen] = useState(0);

//     // const wasAlreadyRequested = useRef(false);

//     const sample =
//         "https://umxjgngsvuacvscuazli.supabase.co/storage/v1/object/public/images/b9e2283a-974d-4fa1-babd-24929027eb8e/749d6b30-a59b-4820-bfd0-393e74f03c3e/youtube_5DEdR5lqnDE_1280x720_h264.mp4";

//     const re: any = /(?:\.([^.]+))?$/;

//     return (
//         <div className="min-h-screen">
//             <div className="flex-1 flex bg-blue-700 min-h-screen flex-col max-w-screen absolute overflow-hidden inset-x-0 pt-4 pb-20 mb-20 space-y-5">
//                 {rows.map((rowPosts, rowIndex) => (
//                     <div key={rowIndex} className="flex items-center px-10">
//                         {rowPosts.map((post: any, index: any) => {
//                             return (
//                                 <FetchThumbnail
//                                     key={index}
//                                     post_by={post.post_by}
//                                     video_id={post.id}
//                                     video_name={post.name}
//                                 />
//                             );
//                         })}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Page;
