import Guest from "../../layouts/guest";
import Banner from "../../components/guest/Banner";
import CardService from "../../components/guest/service/CardService";
import Project from "../../components/guest/project/Project";
import Testimonial from "../../components/guest/testimonial/Testimonial";

const Home = () => {
  return (
    <Guest>
      <Banner></Banner>

      <CardService></CardService>

      {/* about */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center px-6 md:px-16 lg:px-24 gap-8 mb-10">
        <div className="col-span-2">
          <img
            src="/public/assets/images/about.svg"
            className="object-cover w-full max-h-[500px]"
            alt="about image"
          />
        </div>
        <div>
          <h3 className="text-3xl font-black mb-4">About Us</h3>
          <p className="text-xl font-playfair">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </p>
        </div>
      </div>
      {/* end about */}

      <Project />

      <Testimonial />
    </Guest>
  );
};

export default Home;