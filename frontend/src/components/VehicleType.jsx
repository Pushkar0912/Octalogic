import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

const VehicleType = () => {
  const location = useLocation();
  const navigate=useNavigate()
  const data = location.state;
  const apiData = location.state?.apiData; 
  const [selectedOption, setSelectedOption] = useState(null); 

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value); 
  };
  const handleNext = () => {
    apiCall()
  };

  const apiCall = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/getVehicleModel/${selectedOption}`
      );
      navigate("/models", {
        state: { ...data, vehicle_type: selectedOption,apiData:response?.data },
      });
    } catch (error) {
      alert(error?.response?.data?.message);

    }
  };

  return (
    <div className="flex h-screen justify-center items-center gap-3">
      <div className="bg-purple-400 p-5 rounded-md shadow-lg my-3 text-md">
        <h2 className="font-bold">Models for the selected vehicle</h2>
        <h2 className="font-bold">Select an Option</h2>

        {apiData ? (
          <div className="flex flex-col gap-3">
            {apiData?.data?.map((item, index) => (
              <div key={index} className="flex flex-row gap-2 my-3">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="options"
                  value={item.uuid}
                  onChange={handleRadioChange}
                  checked={selectedOption === item.uuid}
                />
                <label htmlFor={`option-${index}`}>{item.vehicle_type}</label>
              </div>
            ))}
               <div className="flex justify-center">
          <button
            className="px-2 py-1 bg-blue-500 text-white flex justify-center rounded-md	"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default VehicleType;
