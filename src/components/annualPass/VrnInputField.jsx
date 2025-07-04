import { useState } from "react";
import { motion } from "motion/react";
import useDataStore from "../../data/useDataStore";

const VrnInputField = () => {
  const {
    numberPlate,
    setNumberPlate,
    placeHolder,
    vrnSubmissionAttempt,
    vrnEditedAfterSubmit,
    setVrnEditedAfterSubmit,
  } = useDataStore();

  const isValid10Digit = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
  const isValid9Digit = /^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{4}$/;

  const shouldAllowInput = (value) => {
    const upper = value.toUpperCase();
    const length = upper.length;

    if (!/^[A-Z0-9]*$/.test(upper)) return false;

    if (length <= 2) return /^[A-Z]{0,2}$/.test(upper);
    if (length <= 4) return /^[A-Z]{2}[0-9]{0,2}$/.test(upper);
    if (length === 5) return /^[A-Z]{2}[0-9]{2}[A-Z]$/.test(upper);
    if (length === 6) {
      return (
        /^[A-Z]{2}[0-9]{2}[A-Z]{2}$/.test(upper) ||
        /^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{1}$/.test(upper)
      );
    }

    const first6 = upper.slice(0, 6);
    const rest = upper.slice(6);

    if (/^[A-Z]{2}[0-9]{2}[A-Z]{2}$/.test(first6)) {
      return /^[0-9]{0,4}$/.test(rest) && length <= 10;
    }

    if (/^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{1}$/.test(first6)) {
      return /^[0-9]{0,3}$/.test(rest) && length <= 9;
    }

    return false;
  };

  const handleChange = (e) => {
    const raw = e.target.value.toUpperCase();

    if (!shouldAllowInput(raw)) return;

    setNumberPlate(raw);
    setVrnEditedAfterSubmit(true); // ✅ Reset error if user edits
  };

  const isInvalidPattern =
    vrnSubmissionAttempt &&
    !vrnEditedAfterSubmit &&
    numberPlate.trim().length > 0 &&
    !isValid9Digit.test(numberPlate) &&
    !isValid10Digit.test(numberPlate);

  return (
    <div className="w-full max-w-[100%]">
      <motion.div
        className={`border-2 rounded-[0.5rem] transition-all duration-200 overflow-hidden flex w-full max-w-[100%] ${
          isInvalidPattern ? "border-red-500" : "border-darkBlue"
        }`}
        initial={{ scale: 1, rotate: 0 }}
        animate={
          isInvalidPattern
            ? {
                x: [0, -36, 36, -44, 44, -42, 42, 0],
                transition: { duration: 0.6, ease: "easeInOut", repeat: 0 },
              }
            : { x: 0 }
        }
      >
        {/* IND Box */}
        <div
          className={`flex flex-col items-center justify-center w-[18%] ${
            isInvalidPattern
              ? "border-r-2 border-red-500"
              : "border-r-2 border-darkBlue"
          }`}
        >
          <div className="mb-1">
            <img
              src={
                isInvalidPattern
                  ? "/assets/redVrnPlate.svg"
                  : "/assets/blueVrnPlate.svg"
              }
              alt="IND"
              className="w-[1.22rem] h-[1.08rem]"
            />
          </div>
          <span
            className={`font-Barlow font-semibold text-[0.64rem] ${
              isInvalidPattern ? "text-red-500" : "text-darkBlue"
            }`}
          >
            IND
          </span>
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder={placeHolder}
            value={numberPlate}
            onChange={handleChange}
            maxLength={10}
            className="w-full text-center text-[1.98rem] tracking-wide font-bold text-gray-500 bg-transparent outline-none placeholder:text-[#C3C3C3]"
          />
        </div>
      </motion.div>

      {isInvalidPattern && (
        <p className="text-red-500 text-sm mt-2 font-medium">
          Invalid VRN. Please follow correct format.
        </p>
      )}
    </div>
  );
};

export default VrnInputField;
