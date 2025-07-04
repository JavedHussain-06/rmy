import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import AnnualPass from "../../components/annualPass/AnnualPass.jsx";
import encryptPayload from "../../utils/encryptPayload.js";
import decryptPayload from "../../utils/decryptPayload.js";
import useDataStore from "../../data/useDataStore.js";

const isDev = import.meta.env.DEV;
const baseUrl = isDev
  ? "/api"
  : "https://117.221.20.185/nhai/api";

const CompleteYourPayment = ({ handleBack, handleNextStep }) => {
  const {
    numberPlate,
    isLoggedIn,
    eligibility,
    userId,
    setPaymentStatus,
  } = useDataStore();

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [currency] = useState("INR");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => setError("Failed to load payment processor");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createOrder = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const payload = {
        vehicle_regno: numberPlate,
        eligibility_id: eligibility,
        user_id: userId,
        call_from: "web",
      };

      const encryptedString = encryptPayload(payload);

      const res = await fetch(
        `${baseUrl}/annual-pass/razorpay/v3.0/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: encryptedString }),
        }
      );

      const data = await res.json();

      if (!data?.payload) {
        throw new Error("Missing encrypted payload in response");
      }

      const decrypted = decryptPayload(data.payload);

      if (isDev) {
        console.log("🔓 Decrypted Razorpay order response:", decrypted);
      }

      if (
        !decrypted?.key ||
        !decrypted?.amount ||
        !decrypted?.order_id ||
        !decrypted?.currency
      ) {
        throw new Error("Invalid response from server");
      }

      return decrypted;
    } catch (err) {
      const message = err.message || "Unexpected error occurred";
      setError(message);
      setPaymentStatus({ success: false, error: message });
      handleNextStep("failed");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = async () => {
    const orderData = await createOrder();
    if (orderData) openRazorpay(orderData);
  };

  const openRazorpay = (paymentData) => {
    if (!isScriptLoaded) return alert("Payment processor not loaded");
    if (!paymentData?.order_id) return alert("Missing payment info");

    const options = {
      key: paymentData.key,
      amount: paymentData.amount,
      currency: paymentData.currency || currency,
      name: "NHAI",
      description: "Annual Pass Payment",
      image: "https://example.com/your_logo",
      order_id: paymentData.order_id,
      handler: function (response) {
        setPaymentStatus({ success: true, response });
        handleNextStep("success");
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (err) {
      setPaymentStatus({ success: false, error: err.error });
      handleNextStep("failed");
    });

    rzp.open();
  };

  return (
    <div className="flex flex-col w-[55%] font-inter justify-around items-center p-6 pt-3 h-full space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4 my-2 w-full">
        <span
          className="text-[#0000004D] text-[1.5rem] font-medium cursor-pointer hover:text-gray-600"
          onClick={handleBack}
        >
          <FaArrowLeft className="inline ml-1" />
        </span>
        <div>
          <h3 className="text-[1.75rem] font-bold text-black font-inter">
            Complete Payment
          </h3>
          <p className="text-[0.9rem] text-[#1B1B1D] font-inter font-[500] leading-snug">
            Review the details and complete payment
            <br /> to pre-book your pass.
          </p>
        </div>
      </div>

      {/* Annual Pass Card */}
      <div className="flex w-[86%] mb-3">
        <AnnualPass
          numberPlate={numberPlate}
          isLoggedIn={isLoggedIn}
          tripsLeft={200}
          expiryDate="1 YEAR"
          vrnTextSize="text-[1.05rem]"
          className="w-[23rem] h-[12rem]"
          pass={true}
          blackBg={true}
          preBook={false}
          statusTextSize="text-[0.4rem]"
          paymentCompleted={false}
        />
      </div>

      {/* Note */}
      <div className="w-[26.5rem] bg-white border border-[#00000026] rounded-[0.6rem] p-3 leading-relaxed font-inter text-[0.7rem]">
        <p className="text-[#4F4F4F]">
          <span className="font-semibold">Note:</span> This is only pre-booking
          of the pass. Your pass will activate automatically on{" "}
          <span className="font-semibold">15th August 2025</span>.
        </p>
        <p className="text-[#4F4F4F]">
          By purchasing your annual pass, you accept our{" "}
          <span className="underline cursor-pointer font-semibold">
            terms and conditions
          </span>
          .
        </p>
      </div>

      {/* Fee */}
      <div className="w-[88%] border-t border-[#D9D9D9] pt-4 flex justify-between items-center text-[1rem]">
        <span>Total Payable Fee</span>
        <span className="font-bold font-inter text-black">₹ 3,000</span>
      </div>

      {/* Proceed Button */}
      <div className="w-full flex justify-center mr-5">
        <motion.button
          className="w-[88%] bg-darkBlue text-white pt-[0.85rem] pb-[0.91rem] rounded-[0.7rem] text-[1rem] font-semibold cursor-pointer ml-7 transform-gpu will-change-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={handleProceed}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Proceed"}
        </motion.button>
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default CompleteYourPayment;
