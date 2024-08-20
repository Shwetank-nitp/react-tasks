import { useEffect, useState } from "react";

function App() {
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(false);
  const [buttonData, setButtonData] = useState([]);
  const [corrent, setCorrent] = useState(false);
  const [reload, setReload] = useState(false);

  function randonHexGenerator() {
    return Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
  }

  function randomColorGenerator() {
    const red = randonHexGenerator();
    const blue = randonHexGenerator();
    const green = randonHexGenerator();
    return `#${red}${blue}${green}`;
  }

  useEffect(() => {
    const trueColor = randomColorGenerator();
    console.log(trueColor);

    const rnum = Math.floor(Math.random() * 3);
    const newArr = [];
    for (let i = 0; i < 3; i++) {
      newArr[i] = {
        name: randomColorGenerator(),
      };
    }
    newArr[rnum] = {
      name: trueColor,
    };

    setButtonData(newArr);

    const time = setTimeout(() => setOpen(false), 1000);

    setColor(() => trueColor);

    return () => {
      clearTimeout(time);
    };
  }, [reload]);

  function handleCheck(e) {
    if (e.target.name === color) {
      setOpen(true);
      setCorrent(true);
      setReload((prev) => !prev);
    } else {
      setOpen(true);
      setCorrent(false);
    }
  }

  return (
    <div>
      <div
        className="m-auto mt-[180px] h-[300px] w-[300px]"
        style={{ backgroundColor: color }}
      ></div>
      <div className="flex gap-2 justify-center mt-4">
        {buttonData.map((item, i) => (
          <button
            onClick={handleCheck}
            key={i}
            name={item?.name}
            className="py-2 px-3 bg-slate-400 rounded-sm text-white"
          >
            {item?.name}
          </button>
        ))}
      </div>
      <div className="text-center">
        {open ? (
          corrent ? (
            <p className="text-green-400 font-bold">Correct !!!</p>
          ) : (
            <p className="text-red-400 font-bold">Wrong !!!</p>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
