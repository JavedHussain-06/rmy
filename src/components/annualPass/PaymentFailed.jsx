import { FaArrowLeft } from "react-icons/fa";

const PaymentFailed = ({ handleBack }) => {
  return (
    <div className=" flex flex-col items-start justify-around p-8  pb-10 font-inter bg-white">
      <div className="relative flex justify-center mb-3">
        <span
          className="absolute left-0 top-0 text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] hover:text-gray-500 cursor-pointer "
          onClick={handleBack}
        >
          <FaArrowLeft className="inline ml-1" />
        </span>

        <div className="flex flex-col items-start gap-2 ml-8">
          <img
            src="/assets/paymentFailed.svg"
            alt="Payment Failed"
            className="w-16 h-16"
          />

          <h2 className="text-[1.4rem] font-bold font-inter text-black">
            Payment Failed
          </h2>
        </div>
      </div>

      {/* Failure message */}
      <div className=" max-w-md px-6 font-inter">
        <p className="text-[#212529] text-[1rem]">
          The payment for vehicle <span className="font-bold">MH12AB1234</span>{" "}
          could not be
          <br />
          completed. This may be due to a{" "}
          <span className="font-semibold">
            network issue,
            <br /> payment timeout
          </span>
          , or <span className="font-semibold">failure</span> from the bank’s
          side.
        </p>

        <p className="mt-4 text-[#212529] text-[1rem] leading-[1.7rem]">
          If the amount was deducted, it will be automatically refunded within{" "}
          <span className="font-semibold">5–7 working days</span>.
        </p>
      </div>

      {/* Try Again button */}
      <div className="w-full max-w-md px-6 mt-10">
        <button
          className="w-full bg-darkBlue text-white py-3 rounded-[0.7rem] text-[1rem] font-semibold tracking-[0.04rem] cursor-pointer"
          onClick={handleBack}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
