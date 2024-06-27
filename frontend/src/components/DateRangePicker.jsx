import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useLocation, useNavigate } from "react-router-dom";

const DateRangePicker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date();

  const data = location.state;

  const getFormattedDate = (date) => {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [state, setState] = useState([
    {
      startDate: today,
      endDate: today,
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
  };

  const handleNext = async () => {
 
    const payload = {
      firstName: data?.["first-name"],
      lastName: data?.["last-name"],
      startDate: moment(state[0].startDate).format("YYYY-MM-DD"),
      endDate: moment(state[0].endDate).format("YYYY-MM-DD"),
      vehicleModelUuid: data?.vehicle_model,
    };


    try {
      const response = await axios.post(
        `http://localhost:5001/api/bookVehicle`,
        payload
      );
      if (response?.data?.status == 200) {
        alert(response?.data?.message);
      }
      navigate("/");
    } catch (error) {
      if (error?.response) {
        alert(error?.response?.data?.message);

      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      {" "}
      <div className="bg-purple-400 p-6 rounded-md shadow-lg text-center">
        {" "}
        <h2 className="font-bold text-lg mb-4">Select a Date Range</h2>{" "}
        <DateRange
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={state}
          className="mx-auto"
        />
        <div className="mt-4">
          <p className="text-sm">
            Start Date: {moment(state[0].startDate).format("YYYY-MM-DD")}
          </p>{" "}
          <p className="text-sm">
            End Date: {moment(state[0].endDate).format("YYYY-MM-DD")}
          </p>{" "}
        </div>
        <div className="mt-6 flex justify-center">
          {" "}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md" 
            onClick={handleNext} 
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
