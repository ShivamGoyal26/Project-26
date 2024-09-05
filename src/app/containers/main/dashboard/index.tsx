import PostEditor from "@/app/containers/main/dashboard/components/editor/PostEditor";
import Post from "@/app/containers/main/dashboard/components/posts/Post";
import TrendsSidebar from "@/components/TrendsSidebar";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";

const Dashboard = async () => {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
      <TrendsSidebar />
    </div>
  );
};

export default Dashboard;
