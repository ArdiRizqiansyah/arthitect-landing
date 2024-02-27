/* eslint-disable react/prop-types */
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import { Toaster } from "react-hot-toast";

const Admin = ({ children }) => {
  return (
    <div className="container-fluid bg-bg-main">
      <div className="flex">
        <Sidebar />

        <div className="w-full">
          <Navbar />

          <div className="p-8">{children}</div>
        </div>
      </div>
      <Toaster
        position="top-right"
      />
    </div>
  );
};

export default Admin;
