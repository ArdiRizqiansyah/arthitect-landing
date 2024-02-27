import { Sidebar } from "flowbite-react";
import {
  HiChartBar,
  HiClipboardDocumentList,
  HiUserGroup,
  HiWrenchScrewdriver,
} from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <Sidebar
      aria-label="Sidebar with logo branding example"
      className="min-h-screen bg-white sidebar"
    >
      <Link to="/admin" className="mb-5 flex items-center pl-2.5">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ArchiWeb
        </span>
      </Link>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <NavLink to="/admin" activeclassname="active">
            <Sidebar.Item icon={HiChartBar}>Dashboard</Sidebar.Item>
          </NavLink>
          <NavLink to="/admin/service" activeclassname="active">
            <Sidebar.Item icon={HiWrenchScrewdriver}>Service</Sidebar.Item>
          </NavLink>
          <NavLink to="/admin/project" activeclassname="active">
            <Sidebar.Item icon={HiClipboardDocumentList}>Project</Sidebar.Item>
          </NavLink>
          <NavLink to="/admin/testimonial" activeclassname="active">
            <Sidebar.Item icon={HiUserGroup}>Testimonial</Sidebar.Item>
          </NavLink>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarAdmin;
