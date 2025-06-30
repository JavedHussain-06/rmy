import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AnnualPassOnBoardingPage from "./pages/AnnualPassOnBoardingPage";
import AnnualPassPage from "./pages/AnnualPassPage";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import Footer from "./components/Footer";
import CongratulationsPage from "./pages/CongratulationsPage";


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AnnualPassPage />} />
        <Route path="/annual-pass/onboarding" element={<AnnualPassOnBoardingPage />} />
        <Route path="/annual-pass/dashboard" element={<DashBoardPage/>} />
        <Route path="/congratulations" element={<CongratulationsPage/>} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
