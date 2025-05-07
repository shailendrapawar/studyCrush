import React from 'react';
import errorImg from "../assets/error-page.svg"
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router';
const ErrorPage = ({ errorTitle = "Page Not Found", errorMessage = "Oops! The page you're looking for doesn't exist." }) => {

const{currentTheme}=useSelector(s=>s.theme)
const navigate=useNavigate()

  return (

    <div className="min-h-screen flex flex-col items-center justify-center p-4"
    style={{backgroundColor:currentTheme.background}}
    >
      <div className="max-w-md w-full rounded-lg  shadow-lg overflow-hidden p-5 text-center"
          style={{backgroundColor:currentTheme.cardBackground}}
      >
        {/* SVG Illustration */}
        <div className="mx-auto w-64 h-64">
          <img src={errorImg}></img>
        </div>

        {/* Error Content */}
        <h1 className="text-3xl font-bold  mt-6">{errorTitle}</h1>
        <p className="mt-3 mb-8"
        style={{color:currentTheme.textSecondary}}
        >{errorMessage}</p>

        {/* Action Buttons */}
        <div className="flex  sm:flex-row justify-center gap-4">
          <button
            onClick={() =>navigate(-1) }
            className="w-30 h-10 rounded-lg shadow-black hover:scale-105 ease-in-out duration-200"
            style={{backgroundColor:currentTheme.accent}}

          >
            Go Back
          </button>
          <button
            onClick={() =>navigate("/user") }
            className="w-30 h-10 hover:scale-105 ease-in-out  rounded-lg transition duration-200"
            style={{border:`2px solid ${currentTheme.accent}`}}
          >
            Home Page
          </button>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;