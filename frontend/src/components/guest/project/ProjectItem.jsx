import { Card } from "flowbite-react";

const projectItem = (props) => {
  return (
    <Card
      imgAlt="project image"
      imgSrc={props.img}
      className="text-center border-0 shadow-none gap-0"
    >
      <h3 className="text-lg font-black mb-1">{props.title}</h3>
      <p>{props.description}</p>
    </Card>
  );
};

export default projectItem;
