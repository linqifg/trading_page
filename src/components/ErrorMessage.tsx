import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-center py-8">
    <div className="text-red-500">{message}</div>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
    >
      重试
    </button>
  </div>
);