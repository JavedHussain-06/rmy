import { motion } from "motion/react";

const formatNumberPlate = (raw) => {
  if (!raw || raw.length !== 10) return raw;
  return raw.replace(
    /^([A-Z]{2})([0-9]{2})([A-Z]{2})([0-9]{4})$/,
    "$1 $2 $3 $4"
  );
};

const AnnualPass = ({
  numberPlate,
  placeHolder,
  tripsLeft = 200,
  totalTrips = 200,
  LetterSpacing,
  className = "",
  preBookTextSize,
  vrnTextSize,
  validityTextSize,
  AmountTextSize,
  statusTextSize,
  paymentCompleted,
  handleBookEvent,
  isLoggedIn = false,
  pass = null,
  blackBg = false,
  preBook = true,
}) => {
  const displayValue =
    numberPlate?.trim() !== ""
      ? formatNumberPlate(numberPlate)
      : formatNumberPlate(placeHolder);
 const backgroundImage = blackBg
  ? "/assets/GrayedOutFastag.png"
  : "/assets/Fastag-template.png";

  return (
    <div
      className={`flex flex-col items-center justify-center ${className} shrink-0`}
    >
      <div className="w-full max-w-[600px] aspect-[16.39/9] relative rounded-xl overflow-hidden text-[clamp(0.75rem, 1.2vw, 1rem)] shadow-lg">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* Top Section */}
        <div className="absolute left-[5%] top-[44%] right-[5%] flex items-center justify-between">
          {preBook ? (
            <>
              <p className="text-white text-[1.2em] font-bold">
                Save Big with Annual Pass
              </p>
              <motion.button
                className={`text-[#3886EA] bg-white font-bold cursor-pointer rounded-[0.5rem] font-inter tracking-normal py-[0.5rem] px-[0.3rem] ${
                  preBookTextSize || vrnTextSize || "text-[1rem]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={handleBookEvent}
              >
                PRE BOOK
              </motion.button>
            </>
          ) : (
            <>
              <img
                src="/assets/dfc-logo.svg"
                alt="DFC Logo"
                className="h-8 w-auto object-contain"
              />
              <span
                className={`text-white font-bold font-inter tracking-wide ${
                  vrnTextSize || "text-[1rem]"
                }`}
              >
                {displayValue}
              </span>
            </>
          )}
        </div>

        {/* Bottom Row */}
        <div className="absolute bottom-[8%] left-[5%] right-[5%] flex justify-between text-white">
          <div className="flex flex-col items-center">
            <span
              className={`text-[#989898] font-bold text-[0.75em] ${LetterSpacing} font-inter`}
            >
              TOTAL TRIPS
            </span>
            <span className="font-montserrat font-bold text-[1.2em]">
              {preBook ? totalTrips : `${tripsLeft}/${totalTrips}`}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span
              className={`text-[#989898] font-bold ${
                validityTextSize || "text-sm"
              } font-inter ${LetterSpacing}`}
            >
              VALIDITY
            </span>
            <span className="font-bold text-[1em] font-inter tracking-tight">
              {preBook ? "1 YEAR" : "15th Aug 2026"}
            </span>
          </div>

          <div className="flex flex-col items-center text-right">
            <span
              className={`text-[#989898] font-bold text-[0.61em] font-inter ${LetterSpacing}`}
            >
              {preBook ? "ONE-TIME PAYMENT" : "STATUS"}
            </span>
            <span
              className={`text-lest ${
                preBook
                  ? AmountTextSize || "text-[1em]"
                  : statusTextSize || "text-[1em]"
              } font-montserrat`}
            >
              {preBook
                ? "₹3000"
                : paymentCompleted
                ? "ACTIVE"
                : "PAYMENT PENDING"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualPass;
