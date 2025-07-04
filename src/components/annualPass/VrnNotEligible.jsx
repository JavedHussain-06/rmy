import useDataStore from "../../data/useDataStore";
import { FaArrowLeft } from "react-icons/fa";

import Button from "../Button";

const VrnNotEligible = ({ handleNextStep }) => {
  const { numberPlate, eligibilityErrorMessage } = useDataStore();
  return (
    <div className="flex flex-col items-start  justify-between p-16 pt-14 w-[50%] h-full relative ">
  {/* Back Arrow + Warning Icon + Heading */}
  <div className="flex items-start   mb-5 font-inter  absolute top-10 left-9 w-[100%]">
    <span
      className="text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] hover:text-gray-500 cursor-pointer block mr-4"
      onClick={handleNextStep}
    >
      <FaArrowLeft className="inline ml-1" />
    </span>
  {/* Warning Icon */}

    <img src="/assets/warning.svg" alt="warning" className="w-[2.8rem] h-[2.8rem]" />

    <h3 className="text-[1.7rem] font-[590] text-black ml-2">
      Your Vehicle is Ineligible
    </h3>
  </div>
      <div className="w-[21.55rem] font-inter mx-auto flex flex-col items-start  mt-16 h-[100%] relative">

  {/* Reason Message */}
  <p className="text-[1.12rem] text-black font-normal font-inter mb-4 ">
    The VRN <span className="font-bold">{numberPlate || "RJ19CD4792 "}</span> has a <span className="font-bold">{eligibilityErrorMessage}</span>.
  </p>

  {/* Conditions */}
  <p className="text-[1.12rem] text-black font-bold mb-1 font-inter">
    Annual Pass is only available for:
  </p>
 <ul className="text-[1.12rem] text-black mb-5 leading-relaxed font-inter">
  <li className="before:content-['–'] before:mr-2 before:text-black list-none">
    Private & Non Commercial Vehicles
  </li>
  <li className="before:content-['–'] before:mr-2 before:text-black list-none">
    Vehicles of class CAR / JEEP / VAN
  </li>
  <li className="before:content-['–'] before:mr-2 before:text-black list-none">
    Non-monthly pass users
  </li>
  <li className="before:content-['–'] before:mr-2 before:text-black list-none">
    Single Active Positive FASTTags
  </li>
</ul>


  {/* FAQ Link */}
  <a href="#" className="text-[#0153AB] text-[0.85rem] font-semibold underline mb-8 mt-8">
    What is eligible?
  </a>

  {/* Button */}
  <div className="mt-18">

  <Button
    handleClick={handleNextStep}
    style="bg-darkBlue text-white text-[1rem] font-inter w-full pt-[0.85rem] pb-[0.91rem] rounded-[0.7rem] font-semibold text-center cursor-pointer absolute bottom-0 left-0 right-0 "
  >
    Return to Home
  </Button>
  </div>
</div>

    </div>
  );
};

export default VrnNotEligible;
