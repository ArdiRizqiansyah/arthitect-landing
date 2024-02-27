import { Card } from "flowbite-react";

const Banner = () => {
  return (
    <div className="flex flex-row-reverse relative">
      <Card className="w-1/2 bg-linear opacity-90 absolute left-0 top-0 bottom-0 p-8 md:my-36 border-0 rounded-none">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Best Solution For Your Home
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet
        </p>
      </Card>
      <img
        src="/public/assets/images/build.svg"
        className="object-cover"
        alt=""
      />
    </div>
  );
};

export default Banner;
