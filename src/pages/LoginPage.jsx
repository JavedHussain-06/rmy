import { AnimatePresence, motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import useDataStore from "../data/useDataStore";
import Button from "../components/Button";
import { sendOtp, verifyOtp } from "../utils/otpService";

const LoginPage = ({ onClose }) => {
  const { setIsLoggedIn, setMobileNumber, setUserId } = useDataStore();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setCanResend(true);
  }, [step, timer]);

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);
    const result = await sendOtp(mobile);
    setLoading(false);

    if (result.success) {
      setStep(2);
      setMobileNumber(mobile);
      setTimer(60);
      setCanResend(false);
    } else {
      setError(result.message);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);
    const result = await verifyOtp(mobile, otp.join(""));
    setLoading(false);

    if (result.success) {
      setIsLoggedIn(true);
      const userId = result?.data?.payload?.userid;
      if (userId) {
        setUserId(userId);
      }
      setTimeout(onClose, 1000);
    } else {
      setError(result.message);
    }
  };

  const handleChangeOtp = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isSendDisabled = mobile.trim().length !== 10 || loading;
  const isVerifyDisabled = otp.join("").trim().length !== 4 || loading;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0  bg-gray/35 z-50 h-screen flex items-center justify-center p-4"
    >
      <div className="relative w-[35rem] rounded-[1rem] bg-white shadow-xl p-5">
        <div className="w-[95%] p-8">
          <Button
            handleClick={() => setTimeout(onClose, 200)}
            style="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </Button>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/nhai-logo.png"
                alt="nhai logo"
                className="w-[2.6rem] h-[2.6rem] mr-6"
              />
              <h2 className="text-[2rem] font-bold text-darkBlue font-inter">
                Login to RajmargYatra
              </h2>
            </div>
            <p className="text-gray-600 font-inter">
              By National Highways Authority of India (NHAI)
            </p>
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {step === 1 ? (
            <>
              <label className="block mb-2 text-sm text-gray-700 font-inter">
                Enter Mobile Number
              </label>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter Mobile Number"
                className="border-b border-gray-400 text-[1.65rem] w-full py-2 mb-6 focus:outline-none placeholder:text-gray-400 tracking-[0.1rem]"
              />

              <motion.button
                onClick={handleSendOtp}
                disabled={isSendDisabled}
                className={`w-[95%] py-3 rounded-full font-semibold text-white font-inter ${
                  isSendDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-darkBlue"
                }`}
                whileHover={!isSendDisabled ? { scale: 1.05 } : {}}
                whileTap={!isSendDisabled ? { scale: 0.95 } : {}}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={loading ? "sending" : "send"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {loading ? "Sending..." : (
                      <span>Send OTP <FaArrowRight className="inline ml-1" /></span>
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </>
          ) : (
            <>
              <label className="block text-sm font-inter mb-4 text-gray-700">
                Enter 4-digit OTP
              </label>
              <div className="flex justify-center gap-4 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleChangeOtp(e.target.value.replace(/\D/g, ""), index)
                    }
                    onKeyDown={(e) => handleBackspace(e, index)}
                    className={`w-12 h-14 text-center border-b-4 text-xl font-bold focus:outline-none ${
                      digit ? "border-blue-600" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="text-center text-sm text-gray-500 mb-4">
                {canResend ? (
                  <button
                    onClick={handleSendOtp}
                    className="text-darkBlue font-semibold hover:underline"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <>
                    Didn’t receive the OTP?{" "}
                    <span className="font-bold">
                      00:{String(timer).padStart(2, "0")}
                    </span>
                  </>
                )}
              </div>

              <motion.button
                onClick={handleVerifyOtp}
                disabled={isVerifyDisabled}
                className={`w-full py-3 rounded-full font-semibold text-white font-inter ${
                  isVerifyDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-darkBlue"
                }`}
                whileHover={!isVerifyDisabled ? { scale: 1.05 } : {}}
                whileTap={!isVerifyDisabled ? { scale: 0.95 } : {}}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={loading ? "verifying" : "login"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {loading ? "Verifying..." : (
                      <span>
                        Verify <FaArrowRight className="inline ml-1" />
                      </span>
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
