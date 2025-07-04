import Button from "../Button";

const orders = [
  {
    numberPlate: "MH12AB1234",
    amount: "₹3000",
    dateTime: "11 June 2025, 9:42 AM",
    txnId: "TXN-987654321",
    status: "Complete",
  },
  {
    numberPlate: "MH12AB1234",
    amount: "₹3000",
    dateTime: "11 June 2025, 9:42 AM",
    txnId: "TXN-987654321",
    status: "Pending",
  },
  {
    numberPlate: "MH12AB1234",
    amount: "₹3000",
    dateTime: "11 June 2025, 9:42 AM",
    txnId: "TXN-987654321",
    status: "Failed",
  },
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "complete":
      return "bg-[#3CAF47]";
    case "pending":
      return "bg-[#FF9500]";
    case "failed":
      return "bg-[#E94F20]";
    default:
      return "bg-gray-400";
  }
};

const OrderHistory = ({ goBack, handleBuy }) => {
  return (
    <div className="relative h-[70vh] bg-white px-6 py-8 flex flex-col items-center font-inter overflow-hidden">
      {/* Back Button */}
      <div className="w-full max-w-2xl mb-4">
        <Button
          handleClick={goBack}
          style="text-[1.12rem] text-darkBlue cursor-pointer tracking-[0.008rem] font-bold hover:underline"
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Header */}
      <h1 className="text-[2rem] font-bold mb-6">Order History</h1>

      {orders.length > 0 ? (
        <div
          className="
            rounded-[0.8rem] w-full max-w-2xl h-full overflow-y-auto pr-2 space-y-4
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-darkBlue
            [&::-webkit-scrollbar-thumb]:rounded-full
            shadow-[inset_0_5px_10px_-2px_rgba(0,0,0,0.05)]
          "
        >
          {orders.map((order, index) => (
            <div
              key={index}
              className="border border-[#00000026] rounded-[0.8rem] p-4 shadow-sm flex justify-between items-stretch"
            >
              <div className="space-y-1 text-sm text-[#1B1B1D]">
                <p>
                  <span className="font-[500] text-[1.2rem]">Annual Pass - </span>
                  <span className="font-bold text-[1.2rem]">{order.numberPlate}</span>
                </p>
                <p className="text-[#00000099] text-[0.89rem]">Amount : {order.amount}</p>
                <p className="text-[#00000099] text-[0.89rem]">Date & Time : {order.dateTime}</p>
                <p className="text-[#00000099] text-[0.89rem]">Transaction ID : {order.txnId}</p>
              </div>

              <div className="flex flex-col justify-between items-end flex-shrink-0 ml-4">
                <span
                  className={`text-white text-xs px-3 py-1 rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <button className="text-darkBlue cursor-pointer text-sm font-semibold hover:underline">
                  View Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Empty State */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-xl font-semibold">No order records found</p>
          </div>

          {/* Buy Button Fixed Bottom Right */}
          <Button
  handleClick={handleBuy}
  style="absolute inset-0 top-80 m-auto w-fit h-fit bg-darkBlue text-white font-inter font-semibold px-6 py-3 rounded-[0.7rem] shadow-md "
>
  Buy Annual Pass
</Button>

        </>
      )}
    </div>
  );
};

export default OrderHistory;
