import { Navbar } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const NavbarGuest = () => {
  return (
    <Navbar rounded className="navbar">
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="font-[barlow] self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ArchiWeb
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <div className="flex md:order-2">
        <Link to="/login">
            <Button as="span" size="sm">
                Login
            </Button>
        </Link>
      </div>
      <Navbar.Collapse className="flex items-center">
        <Navbar.Link href="#" active className="navbar-link">
          Home
        </Navbar.Link>
        <Navbar.Link href="#">Projects</Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarGuest;
