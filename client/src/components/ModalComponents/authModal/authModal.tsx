import React from "react";

interface AuthModalProps {
  message: string | null;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ message, onClose }) => {
  const formatErrorMessage = (errorMessage: string | null): string => {
    if (!errorMessage) {
      return "An unknown error occurred";
    }

    try {
      const parsedError = JSON.parse(errorMessage);
      if (typeof parsedError === "object" && parsedError !== null) {
        //If object, might be a backend error message.
        return parsedError.message || JSON.stringify(parsedError);
      }
    } catch (err) {
      //if parsing fails, it's a string message
    }
    return errorMessage;
  };

  const displayMessage = formatErrorMessage(message);

  return (
    <div
      className="flex absolute top-0 w-screen h-screen z-99 justify-center items-center rounded"
      style={{ backgroundColor: "rgba(0,0,0,.6)" }}
      onClick={onClose}
    >
      <div
        className="border border-neutral-700 bg-white p-5 text-black mx-4 self-center rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-semibold">Error</h1>
        <p className="mt-2">{displayMessage}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
