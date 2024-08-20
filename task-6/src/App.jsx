import { useState } from "react";
import { Progressbar } from "./components/Progressbar";
import { useEffect } from "react";

export default function App() {
  const [value, setValue] = useState(0);
  //console.log(value);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => prev + 1);
    }, 100);
    return () => {
      if (interval) {
        console.log("cancle interval");
        clearInterval(interval);
      }
    };
  }, []);

  return <Progressbar value={value} />;
}
