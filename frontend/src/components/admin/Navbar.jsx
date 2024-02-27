import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate('/login'); //redirect ke halaman login
  }

  return (
    <Navbar fluid rounded>
      <div className="flex ml-auto">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{auth.name}</span>
            <span className="block truncate text-sm font-medium">
              {auth.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <a type="button" onClick={handleLogout}>
              Log out
            </a>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default NavbarAdmin;
