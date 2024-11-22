import React, { useRef, useState, useEffect } from "react";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length === 1) {
      // Single character input
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus on the next input
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6); // Get up to 6 characters
    const newCode = [...code];
    pastedData.split("").forEach((char, idx) => {
      if (idx < 6) {
        newCode[idx] = char;
      }
    });
    setCode(newCode);

    // Focus on the first empty input
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (!newCode[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Code:", code.join(""));
    // Add submission logic here
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      console.log("All fields filled:", code.join(""));
    }
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800  border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">Verify Your Email</h2>
        <p className="text-center text-gray-500 mt-2">
          Please enter the 6-digit code sent to your email address.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(e)}
                className="w-12 h-12 text-center text-lg font-semibold border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Verify Code
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Didn't receive the code?{" "}
          <button className="text-green-500 hover:underline focus:outline-none">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
