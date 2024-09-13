"use client";

import { addAdmin } from "@/lib/actions";
import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="sectionPadding bg-gray-500 flex justify-center items-center min-h-screen">
      <form action={addAdmin} className="bg-white shadow-md rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-center text-blue-900 font-semibold mb-3">Add Admin</h2>
        <input type="text" name="username" placeholder="Username" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <div className="relative">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12" required />
          <button type="button" onClick={togglePasswordVisibility} className="absolute top-6 transform -translate-y-1/2 right-0 h-full px-3 py-2">
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
