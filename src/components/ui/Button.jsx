import React from "react";

export const Button = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};
