import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "../Pages/HomePage";
import { checkAuth } from "../Redux/Actions/Auth.action";
import TestPage from "../Pages/Test/TestPage";
import ResultsPage from "../Pages/Test/ResultTest";
import Index from "../Components/Core/Index";
import IndexMomentum from "../Components/Momentum/IndexMomentum";
import IndexRec from "../Components/Core/RecommendationComponents/Index";
import VisionBoard from "../Components/Vision/VisionBoard";
import VisionForm from "../Components/Vision/VisionForm";

const ClientRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Vérification si firstLogin est true
  if (user?.firstLogin) {
    return <Routes>
      <Route path="/test" element={<TestPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="*" element={<Navigate to="/test" replace />} />
    </Routes>;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/momentum" element={<IndexMomentum />} />
      <Route path="/recommendation" element={<IndexRec />} />
      <Route path="/vision" element={<VisionBoard />} />
      <Route path="//vision-form" element={<VisionForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      

    </Routes>
  );
};

export default ClientRoute;


{/* <Router>
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/test" element={<TestPage />} />
  <Route path="/results" element={<ResultsPage />} />
  <Route path="/plan1"  element={<LayoutPlan1/>} />
  <Route path="/plan2"  element={<LayoutPlan2/>} />
</Routes>
</Router> */}