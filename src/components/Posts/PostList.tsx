"use client";
import PostClient from "./PostClient";

interface Post {
    id: string;
    created_at: string;
    images: string[];
    description: string;
    post_by: string;
    display_name: string;
    handle: string;
    image_user: string;
    role: string;
}

interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }: { posts: Post[] }) => {
    return (
        <div>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="border-b border-x border-slate-400"
                >
                    <PostClient post={post} />
                </div>
            ))}
        </div>
    );
};

export default PostList;
