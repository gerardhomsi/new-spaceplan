"use client";

import { BsArrowRight } from "react-icons/bs";
import { useLoginForm } from "./useLoginForm";

const disabledButtonClass = "mt-4 w-full flex items-center justify-center bg-gray-700 text-white p-3 rounded-lg cursor-not-allowed";
const enabledButtonClass = "mt-4 w-full flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg transition hover:bg-blue-600 focus:outline-none";
const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

const LoginForm = () => {
  const { isLoading, error, handleFormSubmit } = useLoginForm();

  return (
    <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
      <div className="mb-4">
        <input type="text" placeholder="Username" name="username" className={inputClass} />
      </div>
      <div className="mb-6">
        <input type="password" placeholder="Password" name="password" className={inputClass} />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button type="submit" className={`${isLoading ? disabledButtonClass : enabledButtonClass} `} disabled={isLoading}>
        {isLoading ? "Loading..." : "Log in"} <BsArrowRight className={`ml-2 `} />
      </button>
    </form>
  );
};

export default LoginForm;
