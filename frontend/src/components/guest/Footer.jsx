import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterCustom = () => {
  return (
    <Footer
      container
      className="bg-dark-app text-white rounded-none px-6 md:px-16 lg:px-24"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 md:w-3/4">
            <h3 className="text-3xl font-barlow font-semibold mb-2">
              ArchiWeb
            </h3>
            <p className="text-xs text-gray-300">
              Archiweb is an architectural consultant based in Berlin, Germany.
              We provide solutions for your architecture and residential design
            </p>
            <div className="flex space-x-6 mt-4 md:mt-8">
              <Footer.Icon href="#" className="text-white" icon={BsFacebook} />
              <Footer.Icon href="#" className="text-white" icon={BsTwitter} />
              <Footer.Icon href="#" className="text-white" icon={BsInstagram} />
            </div>
          </div>
          <div>
            <Footer.Title
              title="Articles"
              className="text-xl font-inter font-semibold text-white mb-2"
            />
            <Footer.LinkGroup col className="space-y-2">
              <Footer.Link href="#" className="text-white font-light">
                7 Tips for Kids Friendly Interior Design
              </Footer.Link>
              <Footer.Link href="#" className="text-white font-light">
                Smart Tips for Changing a Room
              </Footer.Link>
              <Footer.Link href="#" className="text-white font-light">
                Eco-friendly design
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title
              title="Links"
              className="text-xl font-inter font-semibold text-white mb-2"
            />
            <Footer.LinkGroup col className="space-y-2">
              <Footer.Link href="#" className="text-white font-light">
                Link 1
              </Footer.Link>
              <Footer.Link href="#" className="text-white font-light">
                Link 2
              </Footer.Link>
              <Footer.Link href="#" className="text-white font-light">
                Link 3
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title
              title="Location"
              className="text-xl font-inter font-semibold text-white mb-2"
            />
            <img
              src="/public/assets/images/map.svg"
              className="object-cover"
              alt="map location"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCustom;
