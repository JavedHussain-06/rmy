import useDataStore from "../data/useDataStore";

// Components
import GetReadyToStart from "../components/annualPass/GetReadyToStart";
import AnnualPassProgressFlow from "../components/annualPass/AnnualPassProgressFlow";
import VrnEligibilityContainer from "../components/annualPass/VrnEligibilityContainer";
import VrnNotEligible from "../components/annualPass/VrnNotEligible";
import UploadPhotoStageContainer from "../components/annualPass/UploadPhotoStageContainer";
import OwnerVerification from "../components/annualPass/OwnerVerification";
import OtpVerification from "../components/annualPass/OtpVerification";
import YourVehicleIsEligible from "../components/annualPass/YourVehicleIsEligible";
import PaymentSuccessful from "../components/annualPass/PaymentSuccessful";
import PaymentFailed from "../components/annualPass/PaymentFailed";
import CompleteYourPayment from "../components/annualPass/CompleteYourPayment";
import CongratulationsPage from "./CongratulationsPage"; // ✅ Make sure path is correct

const AnnualPassOnBoardingPage = () => {
  const {
    currentStage,
    setCurrentStage,
    eligibility,
    showCongratulations,
  } = useDataStore();

  // ✅ Render only Congratulations if flag is true
  if (showCongratulations) {
    return <CongratulationsPage />;
  }

  const renderStageComponent = () => {
    switch (currentStage) {
      case 0:
        return <VrnEligibilityContainer handleBack={() => setCurrentStage(1)} />;

      case 1:
        return <GetReadyToStart onContinue={() => setCurrentStage(0)} />;

      case 2:
        return <VrnNotEligible handleNextStep={() => setCurrentStage(0)} />;

      case 3:
        return (
          <YourVehicleIsEligible
            handleNextStep={() => setCurrentStage(4)}
            handleBack={() => setCurrentStage(0)}
          />
        );

      case 4:
        return <UploadPhotoStageContainer />;

      case 5:
        return (
          <OwnerVerification
            handleNextStep={() => setCurrentStage(6)}
            handleBack={() => setCurrentStage(4)}
          />
        );

      case 6:
        return (
          <OtpVerification
            handleNextStep={() => setCurrentStage(7)}
            handleBack={() => setCurrentStage(5)}
          />
        );

      case 7:
        return (
          <CompleteYourPayment
            handleBack={() => setCurrentStage(5)}
            handleNextStep={(status) =>
              setCurrentStage(status === "success" ? 9 : 10)
            }
          />
        );

      case 9:
        return <PaymentSuccessful />;

      case 10:
        return <PaymentFailed handleBack={() => setCurrentStage(7)} />;

      default:
        return (
          <div className="p-4 text-red-600">Unknown stage: {currentStage}</div>
        );
    }
  };

  return (
    <div
      className="absolute flex w-[63.03rem] h-[35.85rem] top-[9rem] left-[15rem] rounded-[1.05rem] bg-white overflow-hidden"
      style={{
        boxShadow: "0px 3.2px 98.08px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      {renderStageComponent()}
      <AnnualPassProgressFlow
        currentStage={currentStage}
        eligibility={eligibility}
      />
    </div>
  );
};

export default AnnualPassOnBoardingPage;
