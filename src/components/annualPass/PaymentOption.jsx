import React, { useState } from "react";
import { FaUniversity, FaCreditCard, FaArrowLeft } from "react-icons/fa";

const PaymentOption = ({ handleBack, handleNext }) => {
  const [selected, setSelected] = useState("");

  const options = [
    {
      label: "Google Pay",
      value: "googlepay",
      icon: (
        <img
          src="/assets/googlepayLogo.svg"
          alt="Google Pay"
          className="w-6 h-6"
        />
      ),
    },
    {
      label: "Paytm",
      value: "paytm",
      icon: (
        <img
          src="/assets/paytmLogo.svg"
          alt="Paytm"
          className="w-6 h-6"
        />
      ),
    },
    {
      label: "Other UPI apps",
      value: "upi",
      icon: (
        <img
          src="/assets/upiLogo.png"
          alt="UPI"
          className="w-6 h-6"
        />
      ),
    },
    {
      label: "Netbanking",
      value: "netbanking",
      icon: <FaUniversity className="text-xl text-blue-900" />,
    },
    {
      label: "Cards",
      value: "cards",
      icon: <FaCreditCard className="text-xl text-blue-900" />,
    },
  ];

  const handleSubmit = () => {
    if (!selected) return;
    handleNext(selected); // ✅ pass the selected payment method
  };

  return (
    <div className="flex flex-col items-center justify-around gap-4 p-4 w-[50%] font-inter">
      {/* Header with back */}
      <div className="flex items-center gap-2 w-full mb-2">
        <span
          onClick={handleBack}
          className="text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] ml-4 hover:text-gray-500 cursor-pointer"
        >
          <FaArrowLeft className="inline ml-1" />
        </span>
        <p className="text-[1.6rem] font-[590] ml-4 text-center text-black font-inter">
          Payment Options
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col w-[70%] gap-4">
        {options.map((option, index) => (
          <label
            key={option.value}
            className={`flex items-center justify-between pb-3 cursor-pointer border-[#00000026] ${
              index !== options.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value={option.value}
                checked={selected === option.value}
                onChange={() => setSelected(option.value)}
                className="w-4 h-4"
              />
              <span className="font-semibold font-inter text-[1rem]">
                {option.label}
              </span>
            </div>
            <div>{option.icon}</div>
          </label>
        ))}

        <button
          disabled={!selected}
          onClick={handleSubmit}
          className={`mt-6 w-full py-2 rounded-lg pt-[0.85rem] pb-[0.91rem] ${
            selected
              ? "bg-darkBlue text-white cursor-pointer"
              : "bg-[#F0F1F1] text-[#C3C3C3] cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentOption;
