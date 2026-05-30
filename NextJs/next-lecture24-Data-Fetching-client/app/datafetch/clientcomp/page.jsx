"use client"

import {useSearchParams} from "next/navigation"
import { useEffect, useState } from "react";
// http://localhost:3000/datafetch/servercomp?name=kiran
// const DataFetchClient = (props) =>{
    const DataFetchClient = () =>{

    const[userInfo, setUserInfo] = useState({});

    // const searchParams = props.searchParams;
    const searchParams = useSearchParams();
    // const userName = searchParams.name;
    const userName = searchParams.get("name");


    if (!userName) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Name Provided
          </h1>
          <p className="text-gray-600">
            Please add <span className="font-mono">?name=yourname</span> to the URL
          </p>
        </div>
      </div>
    </div>
  );
}



    

    useEffect(()=>{


        const revealUserGender = async (params) =>{
            const res = await fetch(`https://api.genderize.io/?name=${userName}`);
            const userData = await res.json();
            console.log(userData);
            setUserInfo(userData);
        }
        revealUserGender();
    },[])

    const confidencePercentage = userData.probability *100;
    const isMale = userData.gender === "male"

    console.log(userData)

    
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">

        {/* Avatar */}
        <div
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4
          ${isMale ? "bg-blue-500" : "bg-pink-500"}`}
        >
          {userInfo.name.charAt(0).toUpperCase()}
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {userInfo.name}
        </h2>

        {/* Gender */}
        <p className="text-gray-600 mb-4">
          Gender:{" "}
          <span
            className={`font-semibold ${
              isMale ? "text-blue-600" : "text-pink-600"
            }`}
          >
            {userInfo.gender}
          </span>
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-700 ease-out
            ${isMale ? "bg-blue-500" : "bg-pink-500"}`}
            style={{ width: `${confidencePercentage}%` }}
          ></div>
        </div>

        {/* Percentage */}
        <p
          className={`text-lg font-bold ${
            isMale ? "text-blue-600" : "text-pink-600"
          }`}
        >
          {confidencePercentage}% Confidence
        </p>
      </div>
    </div>
        </>
    )
}

export default  DataFetchClient ;