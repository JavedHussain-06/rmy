import { motion } from "motion/react"; // ✅ Corrected import
import { FaArrowLeft } from "react-icons/fa";

const UploadImageInstruction = ({ onBack }) => {
  return (
    <motion.div
      className="flex flex-col justify-center gap-4 w-[50%] font-inter items-start"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Header with back arrow */}
      <div className="flex items-center gap-2 w-full">
        <span
          className="text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] ml-1 hover:text-gray-500 cursor-pointer"
          onClick={onBack}
        >
          <FaArrowLeft className="inline ml-1" />
        </span>
        <p className="text-[1.6rem] font-[590]">Clicking the required photos</p>
      </div>

      <div className="p-6 pt-0 mt-3">
        {/* Video placeholder */}
        <div className="w-[22rem] h-[11rem] bg-[#D9D9D9] rounded-[0.84rem] flex items-center justify-center">
          <p className="text-[#00000073] font-[590] text-[0.96rem] font-inter text-center">
            One GIF or short video showing all 3 <br />
            angles in sequence
            <br /> (Front view → Side view → Closeup) <br />
            Looping and muted.
          </p>
        </div>

        {/* Instruction list */}
        <div className="w-[23.4rem]">
          <p className="font-inter font-bold text-[0.9rem] text-[#1B1B1D] my-4">
            Instructions
          </p>
          <ol className="list-decimal pl-5 font-inter text-[#1B1B1D] text-[0.7rem] mb-4 tracking-[0.025rem]">
            <li>
              Ensure the image is taken in a well lit environment, Daylight is
              preferred.
            </li>
            <li>Avoid shadows or reflections.</li>
            <li>
              For <span className="font-bold">front-view,</span> stand ~5ft away
              and ensure full front, headlights & number plate are clearly
              visible.
            </li>
            <li>
              For <span className="font-bold">side-view,</span> step back far
              enough to fit the entire length and ensure wheels, roofline, and
              mirrors are clearly visible.
            </li>
            <li>
              For <span className="font-bold">FASTag close-up,</span> focus on
              the windshield area where FASTag is affixed. The tag details
              should be clearly visible.
            </li>
          </ol>

          {/* Confirm button */}
          <motion.button
            className="font-inter bg-darkBlue text-white pt-[0.85rem] px-[6.99rem] pb-[0.91rem] text-center rounded-[0.7rem] text-[1rem]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3,
              ease: "easeInOut",
            }}
            onClick={onBack}
          >
            ← Got it, take photo
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadImageInstruction;
