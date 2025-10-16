import React, { useContext, useState } from "react";

import HERO_IMG from "../assets/hero-img.png";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
     if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* Landing specific decorative orbs */}
      <div className="pointer-events-none fixed -z-[1] inset-0 overflow-hidden">
        <div className="absolute top-[10%] -right-10 h-56 w-56 md:h-72 md:w-72 rounded-full bg-blue-500/15 blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-[20%] -left-10 h-60 w-60 md:h-80 md:w-80 rounded-full bg-blue-600/10 blur-3xl animate-float-slow" style={{animationDelay: '2s'}}></div>
      </div>
      <div className="container mx-auto px-4 md:px-0 pt-6">
        {/* Top bar */}
        <header className="w-full flex justify-center px-4 py-3">
  <div className="flex items-center justify-between w-full max-w-4xl rounded-full border border-gray-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 py-3 shadow-sm">
    <div className="flex items-center gap-2">
      <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
        <span className="h-3 w-3 rounded-full bg-blue-600 block"></span>
      </div>
      <span className="text-base md:text-lg font-semibold text-blue-600">
        HireHub
      </span>
    </div>

    {user ? (
      <ProfileInfoCard />
    ) : (
      <div className="flex items-center gap-2">
        <button
          className="hidden md:inline-flex text-sm font-semibold text-gray-800 hover:text-blue-600 px-3 py-2 rounded"
          onClick={() => setOpenAuthModal(true)}
        >
          Login
        </button>
        <button
          className="text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setOpenAuthModal(true)}
        >
          Get Started
        </button>
      </div>
    )}
  </div>
</header>


        {/* Hero */}
        <section className="mt-12 md:mt-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Build a Resume that 
              <br />
              <span className="text-blue-600">gets you Hired</span>
            </h1>
            <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
              Empower your creativity and showcase your unique professional story with intuitive resume tools and a seamless experience. No coding skills required.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                className="text-sm font-semibold text-white bg-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-700"
                onClick={handleCTA}
              >
                Start Building Now
              </button>
            
            </div>
            <div className="mt-2 text-[11px] text-gray-500">Try HireHub. No credit card required</div>
          </div>

          {/* Mocked app preview */}
          <div className="relative mt-10 md:mt-12">
            <div className="absolute inset-x-0 -top-2 -bottom-4 mx-6 md:mx-16 bg-blue-50/40 blur-xl rounded-[32px]" aria-hidden></div>
            <div className="relative mx-auto max-w-5xl border border-gray-200 rounded-2xl shadow-lg overflow-hidden bg-white">
              <div className="aspect-[21/9] w-full">
                <img src={HERO_IMG} alt="HireHub preview" className="w-full h-full shadow-blue-600 object-cover" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="text-sm text-gray-500 text-center p-6">Made by Frameworkk</footer>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
