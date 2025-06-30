import { motion } from "framer-motion";
import AnnualPass from "../../components/annualPass/AnnualPass.jsx";
import encryptPayload from "../../utils/encryptPayload.js";
import decryptPayload from "../../utils/decryptPayload.js";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useDataStore from "../../data/useDataStore.js";

const CompleteYourPayment = ({ handleBack, handleNextStep }) => {
  const { numberPlate, isLoggedIn } = useDataStore();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [keyId, setKeyId] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load Razorpay script
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
      const payload = {
        vehicle_regno: "kl01A234",
        call_from: "web",
        eligibility_id: 9,
        user_id: 2,
      };

      const encryptedString = await encryptPayload(payload);
      console.log("Encrypted String:", encryptedString);
      const requestBody = { data: encryptedString };

      const response = await fetch(
        "/nhai/api/annual-pass/razorpay/v3.0/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) throw new Error("Failed to create order");

      const data = await response.json();
      console.log("Order API response:", data);
      const decryptedData = await decryptPayload(data.payload);
      console.log(
        "Decrypted Data:",
        decryptedData.key,
        decryptedData.amount,
        decryptedData.order_id,
        decryptedData.currency
      );

      if (
        !decryptedData.key ||
        !decryptedData.amount ||
        !decryptedData.order_id
      ) {
        throw new Error("Invalid payment data received");
      }

      setKeyId(decryptedData.key);
      setAmount(decryptedData.amount);
      setOrderId(decryptedData.order_id);
      setOrderData(decryptedData);
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(
    "Order ID:",
    orderId,
    "Key ID:",
    keyId,
    "Amount:",
    amount,
    "Currency:",
    currency
  );
  const handleProceed = async () => {
    // if (!orderId) {
    await createOrder();
    // }
    openRazorpay();
  };

  const openRazorpay = () => {
    if (!isScriptLoaded) {
      alert("Payment processor not ready yet");
      return;
    }

    if (!orderId) {
      alert("Payment details not loaded");
      return;
    }

    const options = {
      key: keyId,
      amount: amount,
      currency: currency,
      name: "NHAI",
      description: "Annual Pass Payment",
      image: "https://example.com/your_logo",
      order_id: orderId,
      handler: function (response) {
        console.log("Payment success:", response);
        handleNextStep(8); // Proceed after successful payment
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

    const rzp1 = new window.Razorpay(options);
    //   rzp1.on('payment.failed', function (response) {
    //   console.log('Payment failed:', response.error);
    //   handleNextStep(10); // Payment failed ➜ next step 10
    // });
    rzp1.open();
  };

  return (
    <div className="flex flex-col w-[55%] font-inter justify-around items-center p-6 pt-3 h-full space-y-6">
      {/* Header with back arrow and title */}
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

      {/* FASTag / Annual Pass Card */}
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

      {/* Note Section */}
      <div className="w-[26.5rem] bg-white border border-[#00000026] rounded-[0.6rem] p-3 leading-relaxed font-inter text-[0.7rem] ">
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

      {/* Payment Section */}
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
