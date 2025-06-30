import { useState, useRef } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
import useDataStore from "../../data/useDataStore";
import UploadPhotoCard from "./UploadPhotoCard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Button from "../Button";
import { validateAndCompressImage } from "../../utils/imageUtils";
import decryptPayload from "../../utils/decryptPayload";

const UploadVehiclePhoto = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { eligibilityId, userId, setCurrentStage } = useDataStore();
  const uploadRef = useRef(null);

  const handleUploadAndNext = async () => {
    if (!file || !eligibilityId || !userId) {
      setErrorMsg("Missing file or user information.");
      return;
    }

    if (errorMsg) {
      uploadRef.current?.openFileDialog();
      return;
    }

    setUploading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("image_evidence", file);
    formData.append("eligibility_id", eligibilityId);
    formData.append("user_id", userId);

    try {
      const res = await axios.post("/api/annualpass/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const { resultCode, payload } = res.data;
      let decryptedPayload = payload;

      if (typeof payload === "string") {
        try {
          decryptedPayload = decryptPayload(payload);
        } catch {
          setErrorMsg("Failed to decrypt server response.");
          return;
        }
      }

      if (resultCode === 200 && decryptedPayload?.image_processing) {
        setSuccessMsg(decryptedPayload.message || "Image uploaded successfully");

        setTimeout(() => {
          setSuccessMsg("");
          setCurrentStage(5);
        }, 1000);
      } else {
        throw new Error(decryptedPayload?.message || "Image upload failed");
      }
    } catch (err) {
      const message =
        err?.response?.data?.errorMsg ||
        err?.message ||
        "Upload request failed. Please try again.";
      setErrorMsg(message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (selectedFile) => {
    try {
      const processed = await validateAndCompressImage(selectedFile);
      setFile(processed);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(
        err.message || "Invalid file type. Only JPG and PNG allowed."
      );
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col w-[50%] font-inter items-center p-2 h-full justify-center relative">
      {/* ✅ Success Popup */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            key="success-popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-100 text-sm text-green-800 px-4 py-2 rounded-md shadow-md font-medium z-50 mt-4"
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center relative gap-2 w-full">
        <span
          className="text-[#0000004D] text-[1.2rem] font-[500] tracking-[0.048rem] ml-4 hover:text-gray-500 cursor-pointer absolute top-0 left-0"
          onClick={() => setCurrentStage(3)}
        >
          <FaArrowLeft className="inline" />
        </span>
        <div className="flex flex-col ml-14">
          <h3 className="text-[1.4rem] font-bold text-black font-inter">
            Capture Vehicle Photo
          </h3>
          <p className="text-[1rem] text-[#1B1B1D] mb-4">
            We’ll use this to verify your vehicle details.
          </p>
        </div>
      </div>

      {/* Image Examples */}
      <div className="flex justify-center gap-6 w-full mb-2">
        {[
          ["/assets/check_circle_without_bg.svg", "Correct"],
          ["/assets/cancel.svg", "Wrong"],
        ].map(([icon, label], i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <img src={icon} alt={label} className="w-5 h-5" />
            <div className="w-[11.5rem] h-[6.5rem] rounded-[0.25rem] bg-[#D9D9D9] border border-gray-300" />
          </div>
        ))}
      </div>

      {/* Guidelines */}
      <div className="flex flex-col gap-2 mb-4 items-start w-[80%]">
        {[
          "Take photo in a well lit environment",
          "Ensure number plate is clearly visible",
          "Avoid glare or reflections",
        ].map((text, i) => (
          <div key={i} className="flex items-center gap-2">
            <img src="/assets/check_circle.svg" alt="Check" className="w-4 h-4" />
            <span className="text-[0.9rem] text-[#1B1B1D]">{text}</span>
          </div>
        ))}
      </div>

      {/* Upload UI */}
      <UploadPhotoCard
        ref={uploadRef}
        onFileSelect={handleFileSelect}
        error={!!errorMsg}
      />

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-4 text-sm text-red-700 flex items-center gap-2 font-medium">
          <svg
            className="w-5 h-5 text-red-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 19a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
          {errorMsg}
        </div>
      )}

      {/* Upload Button */}
      <Button
        disabled={!file || uploading}
        handleClick={() => {
          if (errorMsg && uploadRef.current) {
            uploadRef.current.openFileDialog();
          } else {
            handleUploadAndNext();
          }
        }}
        style={`mt-6 text-sm px-6 py-2 w-[22.95rem] pt-[0.85rem] pb-[0.91rem] font-semibold rounded-[0.7rem] transition-colors ${
          file && !uploading
            ? errorMsg
              ? "bg-[#FEE2E2] text-red-700 border border-red-700"
              : "bg-darkBlue text-white"
            : "bg-[#F0F1F1] text-[#C3C3C3]"
        }`}
      >
        {uploading ? (
          "Uploading..."
        ) : errorMsg ? (
          "Retake"
        ) : (
          <>
            Next <FaArrowRight className="inline ml-1" />
          </>
        )}
      </Button>
    </div>
  );
};

export default UploadVehiclePhoto;
