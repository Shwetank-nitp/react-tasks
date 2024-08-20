import { useRef } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";

export default function App() {
  const [length, setLength] = useState(20);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);
  const [isCopy, setIsCopy] = useState(false);
  const [password, setPassword] = useState("");
  const steps = 5;
  const passwordLength = useMemo(
    () => Number((length / steps).toFixed(0)),
    [length]
  );

  const passwordStrength = () => {
    const veryStrongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{12,}$/;
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    const mediumPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    const weakPasswordRegex = /^(?=.*[a-zA-Z]).{1,7}$/;
    if (veryStrongPasswordRegex.test(password)) {
      return "very strong";
    } else if (strongPasswordRegex.test(password)) {
      return "strong";
    } else if (mediumPasswordRegex.test(password)) {
      return "medium";
    } else if (weakPasswordRegex.test(password)) {
      return "week";
    }
    return "week";
  };

  let strength = passwordStrength();

  const value = [
    {
      type: "uppercase",
      status: uppercase,
      label: "Include uppercase letters",
      onChange: () => setUppercase((prev) => !prev),
    },
    {
      type: "lowercase",
      status: lowercase,
      label: "Include lowercase letters",
      onChange: () => setLowercase((prev) => !prev),
    },
    {
      type: "number",
      status: number,
      label: "Include numbers",
      onChange: () => setNumber((prev) => !prev),
    },
    {
      type: "symbol",
      status: symbol,
      label: "Include symbols",
      onChange: () => setSymbol((prev) => !prev),
    },
  ];

  let timeOut;

  function copy() {
    if (timeOut) {
      clearTimeout(timeOut);
      setIsCopy(false);
    }
    setIsCopy(true);
    navigator.clipboard.writeText(password);
    timeOut = setTimeout(() => setIsCopy(false), 1000);
  }

  //will return 0 to max rnum
  function randonNumber(max) {
    return Math.floor(Math.random() * max);
  }

  function genPassword() {
    const chars = [
      number && "1234567890",
      symbol && "!@#$%^&*()",
      lowercase && "asdfghjklqwertyuiopzxcvbnm",
      uppercase && "ASDFGHJKLZXCVBNMQWERTYUIOP",
    ].filter(Boolean);
    let pass = "";
    for (let i = 0; i < passwordLength; i++) {
      if (!chars.length) {
        break;
      }
      const rnum = randonNumber(chars.length);
      pass += chars[rnum].charAt(randonNumber(chars[rnum].length));
    }
    setPassword(pass);
  }

  useEffect(() => {
    genPassword();
  }, []);

  return (
    <div className="flex flex-col p-3 gap-4 bg-gray-900 text-white font-bold max-w-[560px] rounded-sm">
      <div className="flex justify-between gap-4">
        <input
          className="bg-transparent py-2 px-3 flex-grow focus:outline-none"
          type="text"
          value={password}
          readOnly
        />
        <button onClick={copy} className="py-2 px-3 bg-green-500 rounded-md">
          {isCopy ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex justify-between">
        <span>Characters</span>
        <span>{passwordLength}</span>
      </div>
      <input
        type="range"
        value={length}
        step={steps}
        onChange={(e) => setLength(Number(e.target.value))}
      />
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {value.map((item, index) => (
          <span key={index}>
            <input
              className="mr-2"
              checked={item.status}
              onChange={item.onChange}
              id={item.type}
              type="checkbox"
            />
            <label htmlFor={item.type} className="capitalize">
              {item.label} {/* Fixed typo */}
            </label>
          </span>
        ))}
      </div>
      <div>
        <div className="flex justify-between mb-4">
          <span className="font-normal">Strength:</span>
          <span>{strength}</span>
        </div>
        <button
          onClick={genPassword}
          className="w-full rounded-md bg-green-500 py-2 px-3"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}
