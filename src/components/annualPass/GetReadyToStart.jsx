import Button from "../Button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const GetReadyToStart = ({ onContinue }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start  gap-4 p-6 w-[50%]">
      {/* Back Arrow + Heading */}
      <div className="flex items-center gap-2 justify-start mb-6 font-inter">
        <span
          className="text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] hover:text-gray-500 cursor-pointer"
          onClick={() => navigate("/annual-pass/dashboard")}
        >
          <FaArrowLeft className="inline ml-1" />
        </span>
        <h3 className="text-[1.652rem] font-bold text-black ml-4 ">
          Ready to Get Started?
        </h3>
      </div>
      <div className="w-[21.7rem] font-inter mx-auto">
        {/* What you’ll need */}
        <p className="font-bold text-[1.32rem] text-[#1B1B1D] mb-4 ">
          What you’ll need:
        </p>

        <ul className="list-disc pl-5 text-[#1B1B1D] text-[1rem] font-normal mb-5">
          <li>
            Your <span className="font-bold">Vehicle Registration Number</span>{" "}
            (VRN)
          </li>
          <li>
            The vehicle{" "}
            <span className="font-bold">ready for a live photo capture</span>
          </li>
          <li>
            A <span className="font-bold">valid FASTag</span> linked to this
            vehicle with a <span className="font-bold">positive balance</span>
          </li>
          <li>
            Vehicle must be of class{" "}
            <span className="font-bold">Car / Jeep / Van</span> (private &
            non-commercial)
          </li>
        </ul>

        {/* Blue Note Box */}
        <div className="bg-darkBlue text-white text-[0.78rem] font-bold p-3 rounded-[0.87rem] mb-5 w-[23.rem]">
          Note: This is only pre-booking of the pass. Your pass will activate
          automatically on 15th August 2025.
        </div>

        {/* FAQ Link */}
        <div className="mb-5">
          <a
            href="#"
            className="text-darkBlue text-[0.84rem] font-bold underline text-center block mt-10 mb-6"
          >
            Have a question? View FAQs
          </a>
        </div>

        {/* Submit Button */}
        <Button
          handleClick={onContinue}
          style="px-[6.5rem] text-[1rem] mt-2 font-inter w-full pt-[0.85rem] pb-[0.91rem] rounded-[0.7rem]  bg-darkBlue text-white"
        >
          Get pass <FaArrowRight className="inline ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default GetReadyToStart;
