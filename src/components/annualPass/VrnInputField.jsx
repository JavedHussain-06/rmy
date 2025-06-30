import { useState } from "react";
import { motion } from "motion/react";
import useDataStore from "../../data/useDataStore";

const VrnInputField = () => {
  const { numberPlate, setNumberPlate, placeHolder } = useDataStore();
  const [isValid, setsValid] = useState(false);

  const isNumberPlateValid = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;

  const isPartiallyValid = (input) => {
    const value = input.toUpperCase();
    if (value.length > 10) return false;

    const isNumberPlateFormatted = [
      /^[A-Z]{0,2}$/,
      /^[A-Z]{2}[0-9]{0,2}$/,
      /^[A-Z]{2}[0-9]{2}[A-Z]{0,2}$/,
      /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{0,4}$/,
    ];

    return isNumberPlateFormatted.some((regex) => regex.test(value));
  };

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    setNumberPlate(value);

    const isFullValid = isNumberPlateValid.test(value);
    const isPartialValidFlag = isPartiallyValid(value);

    const inputIsInvalid =
      !isPartialValidFlag || (value.length === 10 && !isFullValid);

    setsValid(inputIsInvalid);
  };

  return (
    <div className="w-full max-w-[100%]">
      <motion.div
        className={`border-2 rounded-[0.5rem] transition-all duration-200 overflow-hidden flex w-full max-w-[100%] ${
          isValid ? "border-red-500" : "border-darkBlue"
        }`}
        initial={{ scale: 1, rotate: 0 }}
        animate={
          isValid
            ? {
                x: [0, -36, 36, -44, 44, -42, 42, 0],
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: 0,
                },
              }
            : { x: 0 }
        }
      >
        <div
          className={`flex flex-col items-center justify-center w-[18%] ${
            isValid ? "border-r-2 border-red-500" : "border-r-2 border-darkBlue"
          }`}
        >
          <div className="mb-1">
            <img
              src={
                isValid
                  ? "/assets/redVrnPlate.svg"
                  : "/assets/blueVrnPlate.svg"
              }
              alt="IND"
              className="w-[1.22rem] h-[1.08rem]"
            />
          </div>
          <span
            className={`font-Barlow font-semibold text-[0.64rem] ${
              isValid ? "text-red-500" : "text-darkBlue"
            }`}
          >
            IND
          </span>
        </div>

        {/* Input Field */}
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

      {/* Invalid Message */}
      {isValid && (
        <p className="text-red-500 text-sm mt-2 font-medium">
          Invalid VRN. Please enter a valid VRN.
        </p>
      )}
    </div>
  );
};

export default VrnInputField;
