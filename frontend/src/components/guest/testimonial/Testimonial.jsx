import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TestimonialItem from "./TestimonialItem";
import { useEffect, useState } from "react";
import axios from "axios";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/users/testimonials`;

        const response = await axios.get(url);

        const data = response.data;

        if (response.status === 200) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials", error);
      }
    };

    fetchTestimonial();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 mb-10">
      <h3 className="text-center text-3xl font-black mb-8">Testimonial</h3>

      <Swiper
        spaceBetween={100}
        slidesPerView={2}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <TestimonialItem
                key={testimonial.id}
                name={testimonial.name}
                testimonial={testimonial.description}
                avatar={testimonial.image}
              />
            ))
          ) : (
            <TestimonialItem
              name="Abram Schleifer"
              testimonial="Lorem ipsum dolor sit amet, consectetur adipiscing elit utaliquam, purus sit amet luctus venenatis"
              avatar="/public/assets/images/avatar.svg"
            />
          )}
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialItem
            name="Abram Schleifer"
            testimonial="Lorem ipsum dolor sit amet, consectetur adipiscing elit utaliquam, purus sit amet luctus venenatis"
            avatar="/public/assets/images/avatar.svg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialItem
            name="Abram Schleifer"
            testimonial="Lorem ipsum dolor sit amet, consectetur adipiscing elit utaliquam, purus sit amet luctus venenatis"
            avatar="/public/assets/images/avatar.svg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
