import React from "react";
import { FiDownload } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

const PaymentSuccessful = ({ handleBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8  pb-10 font-inter bg-white">
      <div className="relative w-full max-w-md flex justify-center mb-3">
        <span
          className="absolute left-4 top-1 text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] hover:text-gray-500 cursor-pointer"
          onClick={handleBack}
        >
          <FaArrowLeft className="inline ml-1" />
        </span>

        <div className="flex flex-col items-start gap-2  mr-24">
          <img
            src="/assets/paymentSuccessful.svg"
            alt="Payment successful"
            className="w-16 h-16"
          />

          <h2 className="text-[1.4rem] font-semibold text-black">
            Payment Successful
          </h2>
        </div>
      </div>

      {/* Message */}
      <div className=" max-w-md px-4">
        <p className="text-[#212529] text-[1rem] leading-relaxed">
          Thank you! Annual pass for vehicle{" "}
          <span className="font-bold">MH12AB1234</span> is <br />
          now being issued.
        </p>
      </div>

      {/* Details Box */}
      <div className="border-t border-b border-dashed border-[#DCDEE0] my-6 w-full max-w-md px-6 py-4 text-sm text-gray-700 space-y-4">
        {[
          ["Reference Number", "000085752257"],
          ["Date", "May 24, 2025"],
          ["Time", "07:08 AM"],
          ["Payment Method", "UPI"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between text-[#707070] text-[0.8rem]"
          >
            <span>{label}</span>
            <span className="font-[500] text-black">{value}</span>
          </div>
        ))}
      </div>

      {/* Amount Paid */}
      <div className="w-full max-w-md px-6 text-sm flex justify-between mb-4 text-[#707070] text-[0.8rem]">
        <span>Amount Paid</span>
        <span className="font-bold text-[1rem] text-black">₹ 3,000</span>
      </div>

      {/* Download Receipt */}
      <div>
        <button className="text-darkBlue hover:underline text-sm flex items-center gap-1 text-[0.8rem]">
          <FiDownload />
          Download Receipt
        </button>
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-md px-6 mt-6">
        <button className="w-full bg-darkBlue text-white py-3 tracking-[0.04rem] cursor-pointer rounded-[0.7rem] text-[1rem] font-semibold">
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
