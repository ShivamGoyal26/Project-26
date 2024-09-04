import PostEditor from "@/app/containers/main/dashboard/components/editor/PostEditor";
import Post from "@/app/containers/main/dashboard/components/posts/Post";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";

const Dashboard = async () => {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
