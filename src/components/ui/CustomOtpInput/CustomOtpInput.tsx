import { useState, useRef } from "react";
import CustomTextField from "../CustomTextField/CustomTextFiield";

interface CustomOtpInputProps {
  length?: number;
  onChange: (otp: string) => void;
  maxWidth?: number;
  textColor?: string;
  errorMessage?: string;
}

export default function CustomOtpInput({
  length = 6,
  onChange,
  maxWidth,
  textColor,
  errorMessage,
}: CustomOtpInputProps) {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits or empty

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    onChange(newOtp.join(""));

    // Focus next if filled
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, ""); // only digits
    if (!pasteData) return;

    const newOtp = [...otpValues];
    for (let i = 0; i < length; i++) {
      newOtp[i] = pasteData[i] || "";
      if (pasteData[i] && inputsRef.current[i]) {
        (inputsRef.current[i] as HTMLInputElement).value = pasteData[i]; // update the input DOM directly
      }
    }
    setOtpValues(newOtp);
    onChange(newOtp.join(""));

    // Focus next empty input
    const nextIndex = pasteData.length < length ? pasteData.length : length - 1;
    inputsRef.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        {otpValues.map((val, index) => (
          <CustomTextField
            key={index}
            value={val}
            // errorMessage={errorMessage}
            onPaste={handlePaste}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputRef={(el) => (inputsRef.current[index] = el)}
            maxWidth={maxWidth || 48} // ~48px width
            textColor={textColor}
            inputProps={{
              maxLength: 1,
              style: { textAlign: "center", fontSize: "1.25rem" },
            }}
          />
        ))}
      </div>
      <p className="text-sm text-error-500">{errorMessage && errorMessage}</p>
    </>
  );
}
