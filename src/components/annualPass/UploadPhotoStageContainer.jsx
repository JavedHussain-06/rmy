import { useState } from "react";
import UploadVehiclePhoto from "./UploadVehiclePhoto";
import UploadImageInstruction from "./UploadImageInstruction";

const UploadPhotoStageContainer = ({ handleNextStep }) => {
  const [showInstruction, setShowInstruction] = useState(false);

  return showInstruction ? (
    <UploadImageInstruction onBack={() => setShowInstruction(false)} />
  ) : (
    <UploadVehiclePhoto
      handleNextStep={handleNextStep}
      onShowInstruction={() => setShowInstruction(true)}
    />
  );
};

export default UploadPhotoStageContainer;
