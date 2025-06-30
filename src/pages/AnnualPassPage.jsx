import { motion } from "motion/react";
import useDataStore from "../data/useDataStore";
import AnnualPass from "../components/annualPass/AnnualPass";
import AnnualPassHeroContent from "../components/annualPass/AnnualPassHeroContent";
import HowItWorks from "../components/annualPass/HowItWorks";
import WhatYouWillGeSection from "../components/annualPass/WhatYouWillGeSection";
import LoginPage from "./LoginPage";
import AnnualPassFAQ from "../components/annualPass/AnnualPassFAQ";

const AnnualPassPage = () => {
  const { numberPlate, placeHolder } = useDataStore();


  return (
    <>
      <div
        className={`relative w-[90%] md:w-[80%] lg:max-w-[70%] mx-auto py-10 px-4 bg-white overflow-hidden`}
      >
        {/* Responsive Flex Container */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          {/* Left Section - Hero */}
          <div className="w-full lg:w-1/2">
            <AnnualPassHeroContent />
          </div>

          {/* Right Section - Card + Info */}
          <div className="w-full lg:w-[30.37rem]">
            <AnnualPass
              numberPlate={numberPlate}
              placeHolder={placeHolder}
              tripsLeft={180}
              validity="1 YEAR"
              LetterSpacing="tracking-[0.04rem]"
              preBookTextSize="text-[0.73rem]"
              status={false}
              validityTextSize="text-[0.7rem]"
              AmountTextSize="text-[1.54rem] tracking-[0.08rem] font-bold"
            />

            {/* Pre-booking Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 px-2 gap-4">
              <div>
                <p className="text-darkBlue text-[1.5rem] font-semibold leading-tight">
                  Pre-booking is open.
                </p>
                <p className="text-[#1B1B1D] text-[1.1rem] font-medium leading-snug">
                  Passes will activate
                  <br /> automatically on 15th August.
                </p>
              </div>

              <motion.button
                className="bg-darkBlue text-white rounded-full font-semibold text-[0.9rem] py-3 px-6 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                BOOK NOW
              </motion.button>
            </div>
          </div>
        </div>

        {/* What You Will Get Section */}
        <div className="mt-16">
          <WhatYouWillGeSection />
        </div>
      </div>

      {/* Below Full-Width Sections */}
      <HowItWorks />
      <AnnualPassFAQ />
    </>
  );
};

export default AnnualPassPage;
