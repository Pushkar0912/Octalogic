import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import WheelsPage from "./components/WheelsPage";
import VehicleType from "./components/VehicleType";
import Models from "./components/Models";
import DateRangePicker from "./components/DateRangePicker";

const Root = () => {
  return (

    <Router>
    <Routes>
      <Route key="main-page" path="/" element={<MainPage />} />
      <Route key="wheels-page" path="/wheels" element={<WheelsPage />} />
      <Route key="vehicle-type-page" path="/vehicle-type" element={<VehicleType />} />
      <Route key="models-page" path="/models" element={<Models />} />
      <Route key="date-range-picker" path="/date-range" element={<DateRangePicker />} />



    </Routes>
  </Router>
  )
};

export default Root;
