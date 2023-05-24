import React, { useState, useEffect } from "react";
import { Route, Routes, Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./pages/LandingPage";
import Loading from "./building_blocks/components/Loading";

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();
  const path = "http://localhost:3000";
  if (error) {
    return <div>Oops... {error.message} :(</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <Routes>
      {!isAuthenticated && (      
        <Route path="/" exact={true} element={<LandingPage />} />
      )}
        <Route path="/" exact={true} element={<HomePage />} />
    </Routes>
  );
}

export default App;
