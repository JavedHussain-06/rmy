import { FaArrowRight } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="bg-darkBlue w-full py-[2.5rem] px-[1rem] flex flex-col items-center justify-center">
      <div className="w-[90%] sm:w-full sm:max-w-[70%] relative mx-auto">
  {/* Heading */}
  <h4 className="text-[1.6rem] text-white font-inter font-bold mb-[2rem] lg:absolute top-0">
    How It Works
  </h4>

  {/* Card Container */}
  <div className="
    bg-white w-full rounded-[0.7rem] p-[1.5rem]
    flex flex-col lg:flex-row items-center justify-between
    gap-[2rem] mt-[3.5rem] lg:mt-[4rem] lg:h-[14.35rem]
  ">
    {/* Step 1 */}
    <div className="flex flex-col items-center text-center lg:flex-row lg:items-center justify-between w-full lg:w-[30%] gap-[1rem]">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <img src="/
        /assets/car.svg" alt="car" className="w-[3rem] h-[3rem] mb-[1rem]" />
        <h4 className="text-darkBlue text-[1.6rem] font-bold font-inter tracking-[0.007rem]">
          Check Eligibility
        </h4>
        <p className="text-[0.9rem] text-darkBlue font-[500] font-inter mt-[0.3rem] leading-tight">
          Enter Vehicle Number <span className="font-bold">(VRN)</span> & <br />
          upload an image for eligibility
        </p>
      </div>
      <FaArrowRight className="text-[1.4rem] text-darkBlue hidden lg:block" />
    </div>

    {/* Step 2 */}
    <div className="flex flex-col items-center text-center lg:flex-row lg:items-center justify-between w-full lg:w-[32%] gap-[1rem]">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <img src="/assets/rupee.svg" alt="rupee" className="w-[3rem] h-[3rem]" />
        <h4 className="text-darkBlue text-[1.6rem] font-bold font-inter mt-[0.5rem] tracking-[0.007rem]">
          Complete Payment
        </h4>
        <p className="text-[0.9rem] text-darkBlue font-[500] font-inter mt-[0.3rem] leading-tight">
          Once eligible, pay ₹3000 securely <br />
          via your preferred payment method
        </p>
      </div>
      <FaArrowRight className="text-[1.4rem] text-darkBlue hidden lg:block" />
    </div>

    {/* Step 3 */}
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left w-full lg:w-[25%]">
      <img src="/assets/toll.svg" alt="toll" className="w-[3rem] h-[3rem]" />
      <h4 className="text-darkBlue text-[1.6rem] font-bold font-inter mt-[0.7rem] tracking-[0.007rem]">
        Enjoy Free Trips
      </h4>
      <p className="text-[0.9rem] text-darkBlue font-[500] font-inter mt-[0.3rem] leading-tight">
        Freely pass through 200 National <br />
        Highway toll plazas for 1 year
      </p>
    </div>
  </div>
</div>

    </div>
  );
};

export default HowItWorks;
