const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <p className="text-[1.2rem] mb-6 text-white">Loading...</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
