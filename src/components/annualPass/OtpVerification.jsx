import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import useDataStore from "../../data/useDataStore";
import encryptPayload from "../../utils/encryptPayload";

const OtpVerification = ({ handleNextStep, handleBack }) => {
  const { passMobileNumber, eligibilityId } = useDataStore();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const verifyOtp = async () => {
    const otpValue = otp.join("");
    setError("");
    setLoading(true);

    try {
      const encryptedData = encryptPayload({
        mobilenumber: parseInt(passMobileNumber),
        eligibilityId,
        loginotp: parseInt(otpValue),
      });

      const res = await axios.post(
        "/api/annualpass/v3.0/verify-annual-pass-otp",
        { data: encryptedData },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { resultCode, resultString, errorMsg } = res.data;

      if (resultCode === 200 && resultString === "success") {
        setSuccessMsg("OTP Verified Successfully");
        setTimeout(() => {
          setSuccessMsg("");
          handleNextStep();
        }, 1000);
      } else {
        setError(errorMsg || "Invalid OTP. Please try again.");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[50%] font-inter justify-between p-4 h-full relative">
      <AnimatePresence>
        {successMsg && (
          <motion.div
            key="otp-success"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md font-medium z-50 mt-4 text-sm"
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <div className="flex items-center gap-2 w-full mb-2">
          <span
            className="text-[#0000004D] text-[1.2rem] ml-4 hover:text-gray-500 cursor-pointer"
            onClick={handleBack}
          >
            <FaArrowLeft className="inline" />
          </span>
          <p className="text-[1.6rem] font-[590] text-center text-[#55A36F] font-inter">
            Your Vehicle is Eligible
          </p>
        </div>

        <p className="tracking-[0.021rem] text-[0.89rem] ml-12 mb-2 font-inter">
          Please verify FASTag owner number
        </p>

        <div className="flex items-center flex-col my-4">
          <img
            src="/assets/phoneOTP.svg"
            alt="phone"
            className="w-[6.88rem] h-[6.6rem]"
          />
        </div>

        <p className="text-[#3A3A3A] mt-4 ml-16 my-6 text-[0.96rem] font-inter">
          Enter the OTP sent to{" "}
          <span className="font-bold font-montserrat">+91 {passMobileNumber}</span>
        </p>

        <div className="flex items-center flex-col">
          <div className="flex gap-4 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-12 text-center text-[1.172rem] border-b-2 border-darkBlue focus:outline-none"
              />
            ))}
          </div>

          <p className="text-[0.85rem] text-[#B9B9B9]">
            Didn't receive the OTP?{" "}
            <span className="text-darkBlue font-medium cursor-pointer hover:underline">
              Resend OTP
            </span>
          </p>

          {error && (
            <p className="text-red-500 mt-2 text-sm text-center font-medium">{error}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center my-8">
        <motion.button
          disabled={!isOtpComplete || loading}
          onClick={verifyOtp}
          className={`w-[23.35rem] rounded-[0.7rem] font-inter pt-[0.85rem] pb-[0.91rem] ${
            isOtpComplete && !loading
              ? "bg-darkBlue text-white cursor-pointer"
              : "bg-[#F0F1F1] text-[#C3C3C3] cursor-not-allowed"
          }`}
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
          {loading ? "Verifying..." : "Verify"}
        </motion.button>
      </div>
    </div>
  );
};

export default OtpVerification;
