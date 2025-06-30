import { useNavigate } from "react-router-dom";
import useDataStore from "../../data/useDataStore";
import Button from "../Button";
import { FaArrowRight } from "react-icons/fa";

const AnnualPassHeroContent = ({ setShowLogin }) => {
  const { isLoggedIn } = useDataStore();
  const navigate = useNavigate();

  const handleGetYours = () => {
    navigate("/annual-pass/dashboard");
    // if (isLoggedIn) {
    // } else {
    //   setShowLogin(true);
    // }
  };

  return (
    <div className="">
      <p className="text-[1.7rem] font-bold font-inter leading-[1.7rem] ">
        Save more on every journey.
      </p>

      <h4 className="text-darkBlue text-5xl font-bold antialiased tracking-wider mt-2">
        Annual Pass
      </h4>

      <div className="w-80 my-8">
        <span className="inline text-[1.75rem] font-bold antialiased font-inter leading-normal">
          One pass.
        </span>
        <p className="text-[1.75rem] font-bold antialiased font-inter leading-normal">
         200 free tolls.Valid for 1 year across National Highways.
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <Button
            handleClick={handleGetYours}
            style="bg-darkBlue  text-[1.25rem] text-white font-inter w-[21rem] pt-[1.06rem] pb-[1.12rem] rounded-[2.5rem]"
          >
            Book or View Your Pass <FaArrowRight className="inline ml-1" />
          </Button>

          <Button
            style="bg-white border text-[1.25rem] border-darkBlue px-[2.5rem] text-darkBlue font-inter w-[21rem] py-[0.9rem] rounded-[2.5rem]"
          >
            Eligible Toll Plazas <FaArrowRight className="inline ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnualPassHeroContent;