import { useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import useDataStore from "../../data/useDataStore";
import Button from "../Button";
import encryptPayload from "../../utils/encryptPayload";

const OwnerVerification = ({ handleNextStep, handleBack }) => {
  const [selectedOption, setSelectedOption] = useState("same");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    setMobileNumber,
    setPassMobileNumber,
    mobileNumber,
    eligibilityId,
  } = useDataStore();

  const isValidMobile = (num) => /^\d{10}$/.test(num);
  const canProceed =
    selectedOption === "same" || (selectedOption === "different" && isValidMobile(mobile));

  const sendOtp = async () => {
    setWarning("");

    const targetMobile = selectedOption === "same" ? mobileNumber : mobile;

    if (selectedOption === "different" && targetMobile === mobileNumber) {
      setWarning("⚠️ You're entering the same number as account mobile.");
      return;
    }

    setLoading(true);

    try {
      const encryptedData = encryptPayload({
        mobilenumber: targetMobile,
        eligibilityId,
      });

      const response = await axios.post(
        "/api/annualpass/v3.0/generate-annual-pass-otp",
        { data: encryptedData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.status === 200) {
        if (selectedOption === "same") {
          setPassMobileNumber(mobileNumber);
        } else {
          setPassMobileNumber(mobile);
        }

        setSuccessMsg("OTP sent successfully");
        setTimeout(() => {
          setSuccessMsg("");
          handleNextStep();
        }, 700);
      } else {
        alert(response.data?.error || "Failed to send OTP.");
      }
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[50%] font-inter items-start justify-around p-4 pb-0 relative">
      {/* ✅ Success Message Popup */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md font-medium z-50 mt-4"
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-2 w-full">
        <span
          className="text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] ml-1 hover:text-gray-500 cursor-pointer"
          onClick={handleBack}
        >
          <FaArrowLeft className="inline" />
        </span>
        <p className="text-[1.75rem] text-center text-black font-bold font-inter">
          Your Vehicle is Eligible
        </p>
      </div>

      <p className="tracking-[0.021rem] ml-8 text-[1.12rem] font-inter mt-2 mb-4">
        We’ll use this number for trip balance alerts,
        <br /> expiring pass reminders and other notifications.
      </p>

      {/* Image */}
      <div className="flex items-center w-full flex-col mb-8">
        <img
          src="/assets/phoneOTP.svg"
          alt="phone"
          className="w-[6.88rem] h-[6.6rem] m-auto"
        />
      </div>

      {/* Radio Options */}
      <div className="flex flex-col gap-3 ml-8 mt-4 text-[1rem] text-[#1B1B1D] mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="same"
            checked={selectedOption === "same"}
            onChange={() => {
              setSelectedOption("same");
              setWarning("");
            }}
            className="accent-blue-700 w-4 h-4 font-inter"
          />
          <span>
            Same as my account mobile number{" "}
            <span className="text-[#767676]">({mobileNumber})</span>
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="different"
            checked={selectedOption === "different"}
            onChange={() => {
              setSelectedOption("different");
              setWarning("");
            }}
            className="accent-blue-700 w-4 h-4"
          />
          Use a different mobile number
        </label>
      </div>

      {/* Mobile Input */}
      {selectedOption === "different" && (
        <div className="w-full flex flex-col items-center justify-center mt-2">
          <p className="text-darkBlue text-[0.75rem] mb-1 font-medium text-center">
            Please Enter FASTag owner number
          </p>
          <div className="flex items-center text-[1.25rem] font-bold font-montserrat text-[#1B1B1D] w-[15.18rem]">
            <span className="text-[#767676] leading-none pr-[0.5rem]">+91</span>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) setMobile(value);
              }}
              placeholder="987 987 3333"
              className="outline-none border-none bg-transparent tracking-wider w-[12rem] placeholder:text-[#C4C4C4] leading-none"
              maxLength={10}
            />
          </div>
          <hr className="border-t mt-2 border-[#D9D9D9] w-[65%]" />
          {warning && (
            <p className="text-red-500 text-sm mt-2 text-center font-medium">{warning}</p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="pl-8 mb-2">
        <Button
          style={`rounded-[0.7rem] w-[23.35rem] px-[7rem] pt-[0.85rem] pb-[0.91rem] font-inter cursor-pointer text-[1rem] font-semibold ${
            canProceed && !loading
              ? "bg-darkBlue text-white"
              : "bg-[#E0E0E0] text-[#9C9C9C] cursor-not-allowed"
          }`}
          disabled={!canProceed || loading}
          handleClick={sendOtp}
        >
          {loading ? "Sending..." : "Proceed"}
        </Button>
      </div>
    </div>
  );
};

export default OwnerVerification;
