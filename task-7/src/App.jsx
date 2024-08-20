import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [fillStack, setFillStack] = useState([]);
  
  useEffect(() => {
    if (fillStack.length === 8) {
      const intervalId = setInterval(() => {
        setFillStack((prev) => {
          const newStack = [...prev];
          newStack.pop();
          if (newStack.length === 0) {
            clearInterval(intervalId);
          }
          return newStack;
        });
      }, 1000);
    }
  }, [fillStack]);

  function handleClick(e) {
    const id = Number(e.target.id.slice(4));
    if (id == "4" || fillStack.includes(id)) {
      return;
    }
    setFillStack((prev) => [...prev, id]);
  }

  return (
    <div className="grid">
      {[...Array(9)].map((_, index) => (
        <div
          style={{
            backgroundColor: fillStack.includes(index) ? "green" : "white",
          }}
          onClick={handleClick}
          id={`box-${index}`}
          className="box"
          key={index}
        ></div>
      ))}
    </div>
  );
}
