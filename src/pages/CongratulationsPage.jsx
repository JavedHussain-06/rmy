import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import AnnualPass from "../components/annualPass/AnnualPass";
import { motion } from "motion/react";

const CongratulationsPage = ({ handleGoToDashboard }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const cardRef = useRef(null);
  const [confettiSize, setConfettiSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      setConfettiSize({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
  }, [width, height]);

  return (
    <div className="w-full h-[82vh] flex items-center justify-center bg-[#F9FAFB] relative font-inter overflow-hidden">
      <div
        ref={cardRef}
        className="bg-white rounded-2xl shadow-xl w-[90%] h-[35rem] lg:w-[70%] px-8 py-10 relative z-10 overflow-hidden flex flex-col items-center justify-center"
      >
        <div>
          {/* 🎉 Confetti inside card only */}
          {showConfetti && (
            <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
              <Confetti
                width={confettiSize.width}
                height={confettiSize.height}
                numberOfPieces={700}
                gravity={0.15}
                wind={0.005}
                tweenDuration={6000}
                recycle={false}
                initialVelocityY={10}
              />
            </div>
          )}

          {/* 🎯 Half-Circle Background */}
          <div className="absolute bottom-[0rem] left-1/2 -translate-x-1/2 w-[110%] h-[40vh] bg-gradient-to-t from-[#0E64C3] to-[#1071DA]
 rounded-t-[50%] z-0" />

          <h2 className="text-[2rem] font-bold text-green-600 mb-1 font-inter z-10 absolute top-5">
            Congratulations!
          </h2>
          <p className="text-[#1B1B1D] font-inter text-[1rem] mb-6 relative font-[500] z-10">
            Your Annual Pass has been <br />
            successfully pre-booked.
          </p>

          {/* FASTag Card */}
          <div className="flex justify-center mb-6 flex-col relative pr-2 z-10 overflow-visible">
            <AnnualPass
              numberPlate="DL12AB1234"
              tripsLeft={200}
              expiryDate="15th Aug 2025"
              status="BOOKED"
              vrnTextSize="text-[1rem]"
              className="w-[20rem]"
            />
            {/* Message */}
            <p className="mt-4 text-white mb-8 relative text-[1rem] font-semibold z-10">
              Your pass will activate automatically on 15th
              <br /> August. We’ll notify you once it’s active and <br />
              ready to use.
            </p>

            {/* Dashboard Button */}
            <motion.button
              className="bg-white text-darkBlue px-6 py-3 rounded-lg text-[1rem] font-semibold z-10 cursor-pointer absolute bottom-[-3.5rem] left-0 right-0 transform-gpu will-change-transform"
              onClick={handleGoToDashboard}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              Go to Dashboard
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsPage;
 