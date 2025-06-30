import { useEffect, useState, lazy, Suspense } from "react";
import { FaPlus, FaQuestionCircle, FaInfoCircle, FaArrowRight } from "react-icons/fa";
import { AnimatePresence } from "motion/react";
import AnnualPass from "../components/annualPass/AnnualPass";
import OrderHistory from "../components/annualPass/OrderHistory";
import AllPasses from "../components/annualPass/AllPasses";
import LoginPage from "./LoginPage";
import useDataStore from "../data/useDataStore";

// Lazy load onboarding page
const AnnualPassOnBoardingPage = lazy(() =>
  import("./AnnualPassOnBoardingPage")
);

const DashBoardPage = () => {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showAllPasses, setShowAllPasses] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [goToOnboarding, setGoToOnboarding] = useState(false);

  const { isLoggedIn } = useDataStore();

  useEffect(() => {
    if (isLoggedIn && showLogin) {
      setShowLogin(false); // Close login popup
      setGoToOnboarding(true); // Redirect to onboarding
    }
  }, [isLoggedIn, showLogin]);

  // 🧭 Redirect to Onboarding Page if logged in
  if (goToOnboarding) {
    return (
      <Suspense
        fallback={<div className="p-10 text-center">Loading Onboarding...</div>}
      >
        <AnnualPassOnBoardingPage />
      </Suspense>
    );
  }

  // 🧾 Order history full screen
  if (showOrderHistory) {
    return <OrderHistory goBack={() => setShowOrderHistory(false)} />;
  }

  const handleBookEvent = () => {
    if (isLoggedIn) {
      setGoToOnboarding(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="p-6 space-y-10 max-w-screen-xl mx-auto font-inter">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_20rem_24rem] gap-10 w-full p-4">
          {/* My Passes Section */}
          <div className="space-y-4 col-span-1 mr-18">
            <div className="flex justify-between items-center">
              <h2 className="text-[2em] font-bold tracking-wide">My Passes</h2>
              <button
                className="text-darkBlue text-[1.2rem] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                onClick={handleBookEvent}
              >
                ADD PASS <FaPlus size={14} />
              </button>
            </div>

            <div className="w-[24.7rem]">
              <AnnualPass
                numberPlate="jh76jh8787"
                placeHolder="jh87jh8787"
                tripsLeft={180}
                validity="1 YEAR"
                LetterSpacing="tracking-[0.04rem]"
                preBookTextSize="text-[0.73rem]"
                status={false}
                vrnTextSize="text-[1.6rem]"
                validityTextSize="text-[0.7rem]"
                AmountTextSize="text-[1.54rem] tracking-[0.08rem] font-bold"
                handleBookEvent={handleBookEvent}
              />
            </div>

            {/* Pre-booking CTA */}
            <div className="flex items-center justify-between bg-white py-2 rounded-md w-fit space-x-12">
              <div>
                <p className="text-darkBlue text-[0.95rem] font-semibold leading-tight">
                  Pre-booking is open.
                  <br />
                  <span className="font-normal text-black mr-6">
                    Passes will activate <br />
                    automatically on 15th August.
                  </span>
                </p>
              </div>
              <button
                onClick={handleBookEvent}
                className="bg-[#0153AB] hover:bg-[#004fa0] text-white px-4 py-2 rounded-md font-semibold text-sm whitespace-nowrap cursor-pointer"
              >
                BOOK NOW
              </button>
            </div>
          </div>

          {/* Manage Pass Section */}
          <div className="space-y-4 w-[20rem]">
            <h2 className="text-[2rem] font-bold tracking-wide mb-10">
              Manage Pass
            </h2>
            {[
              {
                label: "View All Passes",
                icon: "/assets/pass.svg",
                onClick: () => setShowAllPasses(true),
              },
              {
                label: "Eligible Toll Plazas",
                icon: "/assets/toll.svg",
                onClick: () => {},
              },
              {
                label: "Order History",
                icon: "/assets/orderHistory.svg",
                onClick: () => setShowOrderHistory(true),
              },
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-[19.45rem] flex items-center justify-between px-4 py-3 border border-[#0153AB26] rounded-[0.84rem] hover:bg-gray-50 transition-all cursor-pointer"
              >
                <span className="flex items-center justify-between w-full gap-3 text-[#1B1B1D] font-medium text-[1rem]">
                  <div className="flex">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-[2rem] h-[2rem]"
                    />
                    <p className="ml-4 text-[1.08rem] font-bold">
                      {item.label}
                    </p>
                  </div>
                  <div className="text-darkBlue text-xl"> <FaArrowRight className="inline ml-1" /></div>
                </span>
              </button>
            ))}
          </div>

          {/* Help Section */}
          <div className="space-y-4">
            <h2 className="text-[2rem] font-bold tracking-wide mb-10">
              Need Help?
            </h2>
            {[
              {
                label: "Frequently asked questions",
                icon: (
                  <FaQuestionCircle className="text-darkBlue bg-white p-1 rounded-full w-[2.3rem] h-[2.3rem]" />
                ),
              },
              {
                label: "Terms and Conditions",
                icon: (
                  <FaInfoCircle className="text-darkBlue bg-white p-1 rounded-full w-[2.3rem] h-[2.3rem]" />
                ),
              },
            ].map((item, index) => (
              <button
                key={index}
                className="w-[21rem] flex items-center justify-between py-3 px-2 border border-[#0153AB26] rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
              >
                <span className="flex items-center justify-between w-full gap-3 text-[#1B1B1D] font-medium text-[1.08rem]">
                  <div className="flex">
                    {item.icon}
                    <p className="font-bold mt-1 ml-2">{item.label}</p>
                  </div>
                  <div className="text-darkBlue text-xl"> <FaArrowRight className="inline ml-1" /></div>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AllPasses modal */}
      {showAllPasses && <AllPasses onClose={() => setShowAllPasses(false)} />}

      {/* Login modal */}
      <AnimatePresence mode="wait">
        {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default DashBoardPage;
