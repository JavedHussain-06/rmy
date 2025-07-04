import { motion } from "motion/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import VrnInputField from "./VrnInputField";
import Button from "../Button";
import useDataStore from "../../data/useDataStore";
import axios from "axios";
import { useState } from "react";
import decryptPayload from "../../utils/decryptPayload";
import encryptPayload from "../../utils/encryptPayload";

const VrnEligibilityContainer = ({ handleBack }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const {
      numberPlate,
      userId,
      setEligibilityData,
      setEligibilityId,
      setTags,
      setEligibilityErrorMessage,
      setCurrentStage,
      setVrnSubmissionAttempt,
      setVrnEditedAfterSubmit,
    } = useDataStore.getState();

    const isValid10Digit = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    const isValid9Digit = /^[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{4}$/;

    setVrnEditedAfterSubmit(false);
    setVrnSubmissionAttempt(true);

    const isValidFormat =
      isValid10Digit.test(numberPlate) || isValid9Digit.test(numberPlate);

    if (!isValidFormat) {
      setEligibilityErrorMessage("Invalid VRN format. Please check and try again.");
      return;
    }

    const payload = {
      vehicleRegNo: numberPlate,
      userId: userId,
    };

    try {
      setLoading(true);

      const encryptedPayload = encryptPayload(payload);

      const response = await axios.post(
        "/nhai/api/annualpass/netc/v3.0/initiate-annual-pass",
        { data: encryptedPayload },
        {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: () => true,
        }
      );

      const encryptedResponse = response?.data;
      if (!encryptedResponse) throw new Error("No payload returned from server");

      const decryptedResponse = decryptPayload(encryptedResponse);
      const resultCode = decryptedResponse.resultCode || decryptedResponse.status || response.status;
      const data = decryptedResponse.data || decryptedResponse.payload || {};

      if (resultCode === 200 && data.eligibilityId && Array.isArray(data.tags)) {
        setEligibilityId(data.eligibilityId);
        setTags(data.tags);
        setEligibilityData({
          eligibilityId: data.eligibilityId,
          ...data.tags[0],
          ownerName: data.ownerName || "NA",
        });
        setEligibilityErrorMessage("");
        setCurrentStage(3);
      } else {
        const errorMessage =
          decryptedResponse?.errorMsg ||
          decryptedResponse?.message ||
          "Eligibility check failed. Please try again.";
        setEligibilityErrorMessage(errorMessage);
        setCurrentStage(2);
      }
    } catch (err) {
      const encryptedError = err?.response?.data;
      let fallbackError = "Something went wrong. Please try again later.";

      if (encryptedError?.payload) {
        try {
          const decryptedError = decryptPayload(encryptedError);
          fallbackError =
            decryptedError?.errorMsg ||
            decryptedError?.message ||
            fallbackError;
        } catch (_) {
          // Ignore decryption failure
        }
      }

      setEligibilityErrorMessage(fallbackError);
      setCurrentStage(2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around gap-4 p-8 w-[50%] relative">
      {/* Header */}
      <div className="flex items-center gap-2 justify-start mb-6 font-inter absolute top-10 left-8">
        <span
          className="text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] hover:text-gray-500 cursor-pointer"
          onClick={handleBack}
        >
          <FaArrowLeft className="inline ml-1" />
        </span>
        <h3 className="text-[1.652rem] font-bold text-black ml-4">
          Enter Vehicle Number
        </h3>
      </div>

      {/* Description */}
      <div className="w-[80%] mt-16 flex flex-col items-start justify-between h-[25%]">
        <p className="text-[1rem] font-inter mb-8">
          Vehicle must be <span className="font-black">CAR/JEEP/VAN</span>{" "}
          (private & non-commercial). It must have a{" "}
          <span className="font-black">single active FASTag</span> linked with a{" "}
          <span className="font-black">positive balance.</span>
        </p>
        <a
          href="#"
          className="text-[0.8rem] text-darkBlue font-inter underline block"
        >
          Have a question? View FAQs
        </a>
      </div>

      {/* Input and Submit Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col items-start justify-between relative h-[50%]"
      >
        <div className="w-[21.76rem] h-[3.35rem] flex items-start justify-center m-0 p-0">
          <VrnInputField />
        </div>

        <div>
          <Button
            type="submit"
            style={`${
              loading
                ? "bg-[#A0A0A0] cursor-not-allowed"
                : "bg-darkBlue text-white"
            } w-[21.75rem] text-[1rem] px-0 pt-[0.85rem] pb-[0.91rem] font-inter`}
            handleClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <motion.div
                className="flex items-center justify-center gap-1"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                      repeat: Infinity,
                      repeatType: "loop",
                    },
                  },
                }}
              >
                {[0, 1, 2].map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    variants={{
                      hidden: { opacity: 0.3, scale: 1 },
                      visible: { opacity: 1, scale: 1.3 },
                    }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <>
                Next <FaArrowRight className="inline ml-1" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VrnEligibilityContainer;
