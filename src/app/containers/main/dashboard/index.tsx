import PostEditor from "@/app/containers/main/dashboard/components/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import ForYouFeed from "./components/for-your-feed";

const Dashboard = async () => {
  return (
    <div className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </div>
  );
};

export default Dashboard;
