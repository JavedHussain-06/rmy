import { FaArrowRight } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

import useStore from "../../data/useStore";
import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaInfoCircle } from "react-icons/fa";

const AnnualPassFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { annualPassFAQs } = useStore();

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-[78%] p-6 mx-auto font-inter">
      <h2 className="text-[1.4rem] mt-10 md:text-2xl font-bold mb-4">
        Frequently Asked Questions (FAQs)
      </h2>

      <div className="">
  {annualPassFAQs?.map((item, index) => (
    <div
      key={index}
      className="border-b last:border-b-0 border-[#00000026"
    >
      <button
        onClick={() => toggle(index)}
        className="w-full text-left px-4 py-4 flex justify-between items-center text-[#00000066] font-medium hover:bg-gray-50 text-[1.2rem]"
      >
        {item.question}
        {activeIndex === index ? <FaChevronDown /> : <FaChevronRight />}
      </button>
      {activeIndex === index && (
        <div className="px-4 pb-4 text-gray-600 text-sm">
          {item.answer}
        </div>
      )}
    </div>
  ))}
</div>


      {/* CTA Section */}
      <div className="mt-8 border-2 border-darkBlue rounded-[1rem] px-[1.38rem] py-[1.5rem] flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[1.5rem] font-semibold text-darkBlue text-center">
          Ready to start saving with Annual Pass?
        </span>
        <button className="bg-darkBlue text-white pl-[0.85rem] py-[1rem] pr-[0.9rem] text-[1rem]  rounded-xl text-sm font-semibold cursor-pointer">
          Book Yours Now <FaArrowRight className="inline ml-1" />
        </button>
      </div>

      {/* Footer Links */}
   {/* Footer Links */}
<div className="flex justify-center items-center gap-6 mt-4 text-darkBlue text-[1.25rem] font-medium">
  <a href="#" className="flex items-center gap-2 hover:underline border-r border-[#00000026] pr-8">
    <BsInfoCircle  className="text-darkBlue  bg-white" />
    Terms and Conditions
  </a>
  <a href="#" className="flex items-center gap-2 hover:underline">
    <BsInfoCircle className="text-darkBlue bg-white" />
    View All FAQs
  </a>
</div>

    </div>
  );
};

export default AnnualPassFAQ;
