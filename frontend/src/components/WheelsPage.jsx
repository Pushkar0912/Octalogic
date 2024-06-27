import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; 

const WheelsPage = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [selectedWheels, setSelectedWheels] = useState("");

  const handleRadioChange = (e) => {
    setSelectedWheels(e.target.value);
  };
  const handleNext = () => {
    apiCall();
  };

  const apiCall = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/getVehicleType/${selectedWheels}`
      );
      navigate("/vehicle-type", {
        state: { ...data, wheels: selectedWheels, apiData: response.data },
      });
    } catch (error) {
      alert(error?.response?.data?.message);

    }
  };

  return (
    <div className="flex h-screen justify-center items-center gap-3">
      {" "}
      <div className="bg-purple-400 p-5 rounded-md shadow-lg my-3 text-md ">
        <h2 className="font-bold ">Step 2</h2>{" "}
        <h2>Choose the Number of Wheels</h2>
        <div className="flex  flex-row justify-around my-3">
          <div className="mb-15 flex flex-column justify-center align-items-center gap-2 ">
            <input
              type="radio"
              name="wheels"
              value="2"
              onChange={handleRadioChange} // Attach the onChange handler
              checked={selectedWheels === "2"}
            />
            <label
              htmlFor="2"
              className=" text-sm text-nowrap"
            >
              2 Wheels
            </label>
          </div>
          <div className="mb-15 flex flex-column justify-center align-items-center gap-2 ">
            <input
              type="radio"
              name="wheels"
              value="4"
              onChange={handleRadioChange} 
              checked={selectedWheels === "4"}
            />
            <label htmlFor="4" className="text-sm text-nowrap">
              4 Wheels
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="px-2 py-1 bg-blue-500 text-white flex justify-center rounded-md	"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WheelsPage;
