import React from 'react';

const Loading = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 animate-spin mb-2"></div>
      <p className="text-white text-lg">{message}</p>
    </div>
  );
};

export default Loading;
