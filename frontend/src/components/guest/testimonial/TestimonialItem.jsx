/* eslint-disable react/prop-types */
import { Avatar } from "flowbite-react";

const TestimonialItem = (props) => {
  return (
    <div className="flex flex-col lg:flex-row text-center items-center lg:text-start gap-3">
      <div>
        <Avatar img={props.avatar} rounded size="xl" />
      </div>
      <div>
        <h5 className="text-xl font-semibold">{props.name}</h5>
        <p className="text-xs font-playfair">{props.testimonial}</p>
      </div>
    </div>
  );
};

export default TestimonialItem;
