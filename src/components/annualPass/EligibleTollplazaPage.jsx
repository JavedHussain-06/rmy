
import { useEffect, useState } from 'react';
import MapPreview from './MapPreview';
// import MapPreview from "./MapPreview";
import { Autocomplete, TextField, FormControl, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import encryptPayload from '../utils/encryptPayload';
import decryptPayload from '../utils/decryptPayload';


const EligibleTollplazaPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedState, setSelectedState] = useState(null); 
  const [selectedTollplaza, setSelectedTollplaza] = useState(null); 
  const [states, setStates] = useState([]);
  const [tollPlazas, setTollPlazas] = useState([]);
  const [selectedPlazaData, setSelectedPlazaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedStateId = selectedState?.detail_id || null;
  console.log("Selected State ID:", selectedStateId);
   useEffect(() => {
    setLoading(true);
    fetch("getNHAIAPI/nhai/api/getStateName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.resultCode === 200 && Array.isArray(data?.payload)) {
          setStates(data.payload);
        } else {
          setStates([]);
          setError("Failed to load states");
        }
      })
      .catch((err) => {
        setStates([]);
        setError("Error fetching states");
        console.error("Error fetching states:", err);
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    // const fetchEncryptedTollPlazas = async () => {
    //   if (!selectedStateId) {
    //     setTollPlazas([]);
    //     setSelectedTollplaza(null);
    //     return;
    //   }

    //   setLoading(true);
    //   try {
    //     const payload = { data: { state_id: selectedStateId } };
    //     console.log("Payload for encryption:", payload);
    //     // const encryptResponse = await fetch("getNHAIAPI/api/encrypt-request", {
    //     //   method: "POST",
    //     //   headers: { "Content-Type": "application/json" },
    //     //   body: JSON.stringify({ data: { state_id: selectedStateId } }),
    //     // });

    //     const encryptedResult = await encryptPayload(payload);
    //     console.log("Encrypted Result:", encryptedResult);
    //     const requestBody = { data: encryptedResult };
    //     console.log("Request Body for toll plaza API:", requestBody);

    //     if (!encryptedResult) {
    //       throw new Error("Encryption failed");
    //     }

    //     const tollResponse = await fetch("getNHAIAPI/nhai/api/tis/v3.0/getTollplazaNameByStateId", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(requestBody),
    //     });
    //     console.log("Toll Response Status:", tollResponse);
    //     const tollResult = await tollResponse.json();

    //     if (!tollResult?.payload) {
    //       throw new Error(tollResult?.errorMsg || "No payload in response");
    //     }

    //     const decryptResponse = await fetch("getNHAIAPI/api/decrypt-request", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ data: tollResult.payload }),
    //     });

    //     const decryptedResult = await decryptResponse.json();

    //     const finalPayload = decryptedResult?.data;

    //     if (Array.isArray(finalPayload)) {
    //       setTollPlazas(finalPayload);
    //       setError(null);
    //     } else {
    //       setTollPlazas([]);
    //       setError("Invalid decrypted format");
    //     }
    //   } catch (err) {
    //     console.error("Error fetching toll plazas:", err);
    //     setTollPlazas([]);
    //     setError("Error fetching toll plazas");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchEncryptedTollPlazas = async () => {
  if (!selectedStateId) {
    setTollPlazas([]);
    setSelectedTollplaza(null);
    return;
  }

  setLoading(true);
  try {
    const payload = { state_id: selectedStateId };
    console.log("Payload for encryption:", payload);

    const encryptedResult = await encryptPayload(payload);
    console.log("Encrypted Result:", encryptedResult);

    const requestBody = { data: encryptedResult };
    console.log("Request Body for toll plaza API:", requestBody);

    if (!encryptedResult) {
      throw new Error("Encryption failed");
    }

    const tollResponse = await fetch(
      "getNHAIAPI/nhai/api/tis/v3.0/getTollplazaNameByStateId",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );
    const tollResult = await tollResponse.json();

    if (!tollResult?.payload) {
      throw new Error(tollResult?.errorMsg || "No payload in response");
    }

    const decryptResponse = await decryptPayload(tollResult?.payload);
    console.log("Decrypted Response:", decryptResponse);
    if (Array.isArray(decryptResponse)) {
      setTollPlazas(decryptResponse);
      setError(null);
    } else {
      setTollPlazas([]);
      setError("Invalid decrypted format");
    }
  } catch (err) {
    console.error("Error fetching toll plazas:", err);
    setTollPlazas([]);
    setError("Error fetching toll plazas");
  } finally {
    setLoading(false);
  }
};

    fetchEncryptedTollPlazas();
  }, [selectedStateId]);

  const handleStateChange = (event, newValue) => {
    setSelectedState(newValue); 
    setSelectedTollplaza(null); 
  };
  const handleTollPlazaChange = (event, newValue) => {
    setSelectedTollplaza(newValue); 
  };

  const handleSearch = () => {
    if (!selectedTollplaza) {
      alert("Please select a valid toll plaza from the list.");
      return;
    }

    const foundPlaza = tollPlazas.find(
      (p) => p.tollplaza_id === selectedTollplaza.tollplaza_id
    );
    if (foundPlaza) {
      const lat = parseFloat(foundPlaza.latitude);
      const lng = parseFloat(foundPlaza.longitude);
      setSelectedPlazaData({
        ...foundPlaza,
        latitude: lat,
        longitude: lng,
      });
      console.log("Selected Plaza:", foundPlaza);
      console.log("Map coordinates:", lat, lng);
    } else {
      setSelectedPlazaData(null);
      alert("Please select a valid toll plaza from the list.");
    }
  };
  return (
    <main className={`h-full w-full px-4 py-4 ${isSmallScreen ? '' : 'md:px-[15%]'}`}>
      <div className="w-full flex flex-col gap-4 py-4">
        <h2 className="text-center font-bold text-xl md:text-2xl lg:text-[2rem] leading-normal font-['Inter'] text-black" style={{ letterSpacing: "-0.208px" }}>
          Eligible Toll Plazas
        </h2>

        <div className={`flex ${isMediumScreen ? 'flex-col' : 'flex-row'} justify-between gap-4`}>
          <div className={`${isMediumScreen ? 'w-full' : 'flex-1'} bg-white ${isMediumScreen ? 'h-auto' : 'h-[18rem]'} p-4`}>
            <div className=" flex flex-col gap-6 md:gap-8">
              <FormControl fullWidth>
                <Autocomplete
                  options={states}
                  getOptionLabel={(option) => option?.label || ""} 
                  value={selectedState}
                  onChange={handleStateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State / UT"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderTop: 'none',
                            borderBottom: '1px solid #d3d3d3',
                          },
                        },
                      }}
                    />
                  )}
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <Autocomplete
                  options={tollPlazas}
                  getOptionLabel={(option) => option?.label || option?.tollplaza_name || ""} 
                  value={selectedTollplaza}
                  onChange={handleTollPlazaChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Enter Toll Plaza Name"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderTop: 'none',
                            borderBottom: '1px solid #d3d3d3',
                          },
                        },
                      }}
                    />
                  )}
                  fullWidth
                />
              </FormControl>

              <button
                className="w-full bg-darkBlue text-white py-2 rounded-[12px] cursor-pointer transition font-inter  "
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
         <div className={`${isMediumScreen ? 'w-full' : 'flex-1'} bg-white border border-gray-300 ${isMediumScreen ? 'h-auto' : 'h-[18rem]'} p-4 rounded-lg`}>
            <div className="flex flex-col gap-3 h-full">
              <div className="pb-1.5">
                <h3 className="text-darkBlue font-semibold text-base">STRETCH</h3>
                <p className="text-gray-500 text-xs">
                  {selectedPlazaData && selectedPlazaData?.Chainage && selectedPlazaData?.Chainage !== "" ? `${selectedPlazaData?.Chainage} ` : "No data found"}
                </p>
              </div>
              <div className="pb-1.5">
                <h3 className="text-darkBlue font-semibold text-base">TOLLABLE LENGTH</h3>
                <p className="text-gray-500 text-xs">
                  {selectedPlazaData && selectedPlazaData?.TollableLength && selectedPlazaData?.TollableLength !== "" ? `${selectedPlazaData?.TollableLength} ` : "No data found"}
                </p>
              </div>
              <div className="pb-1.5">
                <h3 className="text-darkBlue font-semibold text-base">FEE EFFECTIVE DETAILS</h3>
                <p className="text-gray-500 text-xs">
                  {selectedPlazaData && selectedPlazaData?.DtEffectiveRates && selectedPlazaData?.DtEffectiveRates !== ""
                    ? new Date(selectedPlazaData?.DtEffectiveRates).toLocaleString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                      })
                    : "No data found"}
                </p>
              </div>
              <div className="pb-1.5">
                <h3 className="text-darkBlue font-semibold text-base">DUE DATE FOR TOLL REVISION</h3>
                <p className="text-gray-500 text-xs">
                  {selectedPlazaData && selectedPlazaData?.DtRateRevision && selectedPlazaData?.DtRateRevision !== ""
                    ? new Date(selectedPlazaData?.DtRateRevision).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                      })
                    : "No data found"}
                </p>
              </div>
            </div>
          </div>

          <div className={`${isMediumScreen ? 'w-full h-64' : 'flex-1 h-[18rem]'} bg-white border border-gray-300 rounded-lg overflow-hidden`}>
            <MapPreview
              lat={selectedPlazaData?.latitude ?? 22.5937}
              lng={selectedPlazaData?.longitude ?? 78.9629}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EligibleTollplazaPage;