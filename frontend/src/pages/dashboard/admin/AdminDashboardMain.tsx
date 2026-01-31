// src/pages/dashboard/admin/AdminDashboardMain.tsx
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import adminMan from "../../../assets/man-with-laptop.png";
import files from "../../../assets/wallet-info.png";
import { CiMenuKebab } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";


const AdminDashboardMain = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 md:gap-8 pt-2 md:pt-8">
      {/* top section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* left section */}
        <div className="w-full lg:w-[60%] md:h-[220px] h-fit flex bg-white shadow border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
            <div className="flex flex-col gap-4 pt-6 px-6">
              <h1>
                Congratulations{" "}
                <span className="text-pink-500 font-medium">{user?.name}</span>{" "}
                🎉
              </h1>
              <p className="text-gray-700 text-sm">
                You have done 72% more sales today. <br />
                Check your new badge in your profile.
              </p>
              <div className="md:pt-6">
                <button className="bg-pink-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">
                  View profile
                </button>
              </div>
            </div>
            <div className="flex md:items-end items-center justify-center md:justify-end pt-8 md:pt-0">
              <img
                src={adminMan}
                alt=""
                className="w-[260px] h-[180px] pr-12"
              />
            </div>
          </div>
        </div>
        {/* right section */}
        <div className="w-full lg:w-[40%] h-[220px] grid grid-cols-2 gap-4">
          {/* left side */}
          <div className="w-full bg-white shadow border rounded-lg">
            <div className="flex flex-col gap-2">
              <h1 className="px-4 pt-2 text-lg font-bold text-gray-700">Order</h1>
              <h2 className="px-4 text-lg font-semibold">276K</h2>
              <p>pie chart</p>
            </div>
          </div>
          {/* right side */}
          <div className="w-full bg-white shadow border rounded-lg p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <img src={files} alt="fileImage" className="w-fit h-full"/>
              <CiMenuKebab className="cursor-pointer"/>
            </div>
            <p className="text-slate-600 font-semibold">Sales</p>
            <p className="text-2xl font-bold">$4,679</p>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <FaArrowUp />
              <p> +28.42%</p>
            </div>
          </div>
        </div>
      </div>
      {/* middle section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* left section */}
        <div className="w-full lg:w-[60%] h-[440px] flex bg-white shadow border rounded-lg">
          <h1>name</h1>
        </div>
        {/* right section */}
        <div className="w-full lg:w-[40%] h-[440px] flex flex-col gap-4">
          <div className="w-full h-[220px] grid grid-cols-2 gap-4">
            {/* left side */}
            <div className="w-full bg-white shadow border rounded-lg">left</div>
            {/* right side */}
            <div className="w-full bg-white shadow border rounded-lg">
              right
            </div>
          </div>
          <div className="w-full h-[220px] bg-white shadow border rounded-lg">
            bottom
          </div>
        </div>
      </div>
      {/* bottom section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* left side */}
        <div className="w-full h-[330px] bg-white shadow rounded-md border"></div>
        {/* middle side */}
        <div className="w-full h-[330px] bg-white shadow rounded-md border"></div>
        {/* right side */}
        <div className="w-full h-[330px] bg-white shadow rounded-md border"></div>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
