import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    "first-name": "",
    "last-name": "",
  });
  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleNext = (e) => {
    e.preventDefault();
    if (!data["first-name"] || !data["last-name"]) {
      alert("Please fill  both your first and last name.");
    }
    navigate("/wheels", {
      state: data,
    });
  };
  return (
    <div className="flex h-screen justify-center items-center gap-3">
      <div className="bg-purple-400 p-5 rounded-md shadow-lg my-3 text-md ">
        <h2 className="font-bold ">First,whats your name?</h2>{" "}
        <div className="my-3">
          <div className="my-5 flex flex-col ">
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              onChange={handleChange}
              className="border border-gray-300 p-1 rounded"
            />
          </div>
          <div className="mb-15   flex flex-col ">
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              onChange={handleChange}
              className="border border-gray-300 p-1 rounded"
            />
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

export default MainPage;
