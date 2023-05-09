import { Navigate, Route, Routes } from "react-router-dom";
import AssetReport from "./pages/Report/AssetReport";
import LayoutMarketWatch from "./components/layoutMarketwatch/LayoutMarketWatch";
import AppProvider from "./Context/AppContext";
import SlidesMarketWatch from "./components/indexMarketWatch/SlidesMarketWatch";
import Slide from "./pages/slide";
import MySwiper from "./pages/swiper";
import DraggableDiv from "./pages/dragable";
function App() {
  return (
    <div>
        <AppProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/chung-khoan/HSX" />} />
        <Route path="/chung-khoan" element={<Navigate to="/chung-khoan/HSX" />} />
        <Route path="/chung-khoan/:id" element={<LayoutMarketWatch />} />   
        <Route path="/report/ClientActivityRange" element={<SlidesMarketWatch />} />
        <Route path="/report/TradeLog" element={<DraggableDiv />} />
        <Route path="/report/PendingSettlement" element={<MySwiper />} />
        {/* <Route path="/chung-khoan" element={<LayoutMarketWatch />} />    */}
      </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
