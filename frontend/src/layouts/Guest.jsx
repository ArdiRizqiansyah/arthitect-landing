import Navbar from "../components/guest/Navbar";
import Footer from "../components/guest/Footer";

const guest = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
};

export default guest;
