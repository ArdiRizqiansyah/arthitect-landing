import { Card } from "flowbite-react";
import {
  HiOutlineHome,
  HiOutlineBookmark,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import Service from "./Service";
import { useEffect, useState } from "react";
import axios from "axios";

const CardService = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/users/services`;

        const response = await axios.get(url);

        const data = response.data;

        if (response.status === 200) {
          setServices(data.data);
        }
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <Card className="bg-primary-surfacea-app border-0 rounded-none shadow-none py-6 mb-10">
      <h3 className="text-3xl font-black text-center mb-4">Our Services</h3>

      <div className="flex flex-nowrap justify-between md:px-12 lg:px-24 xl:px-40 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <Service
              key={service.id}
              title={service.name}
              description={service.description}
              icon={<i className={service.icon}></i>}
            />
          ))
        ) : (
          <>
            <Service title="Planing" description="Our Services Line one Servive line two" icon={<HiOutlineBookmark className="text-5xl" />} />
          <Service title="Interior" description="Our Services Line one Servive line two" icon={<HiOutlineHome className="text-5xl" />} />
          <Service title="Exterior" description="Our Services Line one Servive line two" icon={<HiOutlinePencilSquare className="text-5xl" />} />
          </>
        )}
      </div>
    </Card>
  );
};

export default CardService;
