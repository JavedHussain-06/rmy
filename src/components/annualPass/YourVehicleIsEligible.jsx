import { FaArrowLeft } from "react-icons/fa";
import Button from "../Button";
import useDataStore from "../../data/useDataStore";
import getStateFromVehicleNumber from "../../utils/Rto"
const YourVehicleIsEligible = ({ handleNextStep, handleBack }) => {

const { eligibilityData } = useDataStore(); 



  const handleProceed = () => {
    if (handleNextStep) {
      handleNextStep();
    } else {
      console.error("handleNextStep is not defined!");
    }
  };
  return (
    <div className="flex flex-col w-[55%]  font-inter justify-around items-center p-6 h-full">
      <div className="flex items-center gap-2 w-full mb-2">
        <span
          className="text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] ml-4 hover:text-gray-500 cursor-pointer"
          onClick={handleBack}
        >
         <FaArrowLeft className="inline" />
        </span>
        <img
          src="/assets/check_circle.svg"
          alt="check"
          className="w-[2.8rem] h-[2.8rem] "
        />
        <p className="text-[1.75rem] font-[590] text-center text-black font-inter">
          Your Vehicle is Eligible
        </p>
      </div>
      <div className="w-[80%] h-[17.6rem]  rounded-[0.8rem] border border-[#00000026] font-inter p-5 pr-3 flex flex-col justify-between shadow-sm  relative ">
        {/* Header */}
        <div className="flex justify-between items-center ">
          <h3 className="text-[1.55rem] font-bold text-black">Vehicle Info</h3>
          <img
            src="/assets/car.svg"
            alt="car"
            className="w-[2.06rem] h-[2.87rem] mr-4"
          />
        </div>

        {/* Info Rows */}
        <div className="grid grid-cols-2 gap-y-2 text-[0.82rem] text-[#5F5F67] font-medium">
          <div>
            <p className="mb-1 text-[#717171] text-[0.87rem] font-[500]">
              Vehicle Number
            </p>
            <p className="text-black font-semibold text-[1rem]">{
          eligibilityData.REGNUMBER}</p>
          </div>
          <div>
            <p className="mb-1 text-[#717171] text-[0.87rem] font-[500]">
              Vehicle Model
            </p>
            <p className="text-black font-semibold text-[1rem]">
              {eligibilityData.VEHICLECLASS}
            </p>
          </div>
          <div>
            <p className="mb-1 text[#717171] text-[0.87rem] font-[500]">
              Owner
            </p>
            <p className="text-black font-semibold text-[1rem]">{eligibilityData.ownerName}</p>
          </div>
          <div>
            <p className="mb-1 text-[#717171] text-[0.87rem] font-[500]">RTO</p>
            <p className="text-black font-semibold text-[1rem]">
              {getStateFromVehicleNumber(eligibilityData.REGNUMBER)}
            </p>
          </div>
        </div>

        {/* FASTag */}
        <div className="mt-4 font-inter ">
          <p className="text-[0.87rem] text-[#5F5F67] mb-1 font-[500]">
            FASTag ID
          </p>
          <p className="text-black text-[1rem] font-semibold">
            {eligibilityData.TAGID}
          </p>
        </div>
      </div>

      <Button
        style="bg-darkBlue font-inter text-white tracking-[0.04rem] px-[6.3rem] pt-[0.85rem] pb-[0.91rem] w-[24.5rem] rounded-[0.7rem] cursor-pointer  mt-2 flex justify-center items-center text-center"
        handleClick={handleProceed}
      >
        Proceed
      </Button>
    </div>
  );
};

export default YourVehicleIsEligible;
