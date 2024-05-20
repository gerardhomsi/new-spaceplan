import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="gap-7 bg-white p-6 rounded-lg shadow-md w-full max-w-sm min-h-[240px]">
        <form className="space-y-4">
          <h2 className="text-center text-2xl font-semibold text-blue-950">Login</h2>
          <input type="text" placeholder="UserName" className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
          <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
          <button type="submit" className="w-full py-2 px-4 bg-blue-950 text-white rounded-md hover:bg-blue-900">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
