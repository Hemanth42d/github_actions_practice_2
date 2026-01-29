import Sidebar from "./HomePage/Sidebar";
import MyTasks from "./MyTasks";
import NavBar from "./NavBar";

const Dashboard = () => {
  return (
    <div className="h-screen w-full">
      <div className="border-b border-gray-100 py-4">
        <NavBar />
      </div>
      <div className="w-full h-[90%] flex gap-5 px-4">
        <div className="w-[14%]">
          <Sidebar />
        </div>
        <div className="w-[84%] border">
          <MyTasks />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
