import useDataStore from "../../data/useDataStore";
import AnnualPass from "../annualPass/AnnualPass";

const AllPasses = ({ onClose }) => {
  const { numberPlate, placeHolder } = useDataStore();

  // Dummy array to render multiple passes
  const dummyPasses = Array(8).fill({
    numberPlate,
    placeHolder,
    tripsLeft: 200,
    validity: "10th Oct 2025",
    status: true,
  });

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-6xl max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Annual Passes</h2>
          <button
            onClick={onClose}
            className="text-[#00000026] hover:text-gray-400 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Grid of Passes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {dummyPasses.map((pass, index) => (
            <div key={index} className="w-[20rem]">
              <AnnualPass
                numberPlate={pass.numberPlate}
                placeHolder={pass.placeHolder}
                tripsLeft={pass.tripsLeft}
                validity={pass.validity}
                LetterSpacing="tracking-[0.04rem]"
                preBookTextSize="text-[0.73rem]"
                status={pass.status}
                validityTextSize="text-[0.7rem]"
                AmountTextSize="text-[1.54rem] tracking-[0.08rem] font-bold"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPasses;
