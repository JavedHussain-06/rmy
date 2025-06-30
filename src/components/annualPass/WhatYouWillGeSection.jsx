import useStore from "../../data/useStore";
import Card from "../Card";

const WhatYouWillGeSection = () => {
  const { whatYouWillGet } = useStore();

  return (
    <section className="w-full px-4 md:px-0 py-6">
      <div
        className="
          flex flex-wrap gap-4 
          justify-center md:justify-between 
          w-full max-w-screen-xl mx-auto
        "
      >
        {whatYouWillGet.map((item, index) => (
          <Card
            key={index}
            headingHTML={item.heading}
            bg={item.bg}
            headingStyle={item.headingStyle}
          />
        ))}
      </div>
    </section>
  );
};

export default WhatYouWillGeSection;
