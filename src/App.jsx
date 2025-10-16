import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import EditResume from "./pages/ResumeUpdate/EditResume";
import UserProvider from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        {/* Global decorative background orbs */}
        <div className="pointer-events-none fixed -z-10 inset-0 overflow-hidden">
          <div className="absolute -top-16 -left-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl animate-float-slow" style={{animationDelay: '3s'}}></div>
        </div>
        <Router>
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume/:resumeId" element={<EditResume />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;
