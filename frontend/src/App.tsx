// src/App.tsx

import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import { ToastContainer } from "react-toastify";
import TopHeader from "./components/shared/TopHeader";
import HeaderBottom from "./components/shared/HeaderBottom";
import TitleManager from "./components/shared/TitleManager";


const App = () => {
  return (
    <div>
      <TitleManager />
      <TopHeader />
      <Header />
      <div className="hidden md:flex h-16 items-center justify-center shadow px-4 border-b">
        <HeaderBottom />
      </div>
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        theme="colored"
      />
    </div>
  );
};

export default App;
