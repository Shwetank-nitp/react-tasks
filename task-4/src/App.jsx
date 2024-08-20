import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const yearOption = [1, 2, 3, 4, 5];
  const [total, setTotal] = useState(0);
  const [rate, setRate] = useState(10);
  const [fee, setFee] = useState(1);
  const [year, setYear] = useState(yearOption[0]);
  const [lone, setLone] = useState(0);
  const [downPay, setDownPay] = useState(0);

  useEffect(() => {
    const downPayment = total * (10 / 100);
    const intrest = (total - downPayment) * (rate / 100) * year;

    setDownPay(Number(downPayment.toFixed(2)));
    setLone(Number((total - downPayment + intrest).toFixed(2)));
  }, [total, rate, fee]);

  useEffect(() => {
    const intrest = (total - downPay) * (rate / 100) * year;
    setLone(Number((total - downPay + intrest).toFixed(2)));
  }, [downPay]);

  useEffect(() => {
    const principal = (lone * 100) / (rate * year + 100);
    const dPay = total - principal;
    setDownPay(Number(dPay.toFixed(2)));
  }, [lone]);

  function calcEffDownPayment() {
    return Number((downPay + (fee / 100) * (total - downPay)).toFixed(2));
  }

  function a() {
    const r = rate / 100;
    const i = total * r * year;
    const lone2 = i + total;
    return lone2 / (year * 12);
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center font-bold">
        <div className="p-4 w-[40%]">
          <div className="my-4 font-bold text-3xl">EMI Calculator</div>
          <div>
            <label htmlFor="total" className="block text-lg font-bold my-2">
              Total Cost of Assistance
            </label>
            <input
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
              className="w-full py-2 px-4 border-b-black border-b-2 focus:outline-none"
              id="total"
              type="number"
              placeholder="Total Amount"
            />
          </div>
          <div>
            <label htmlFor="rate" className="block text-lg font-bold my-2">
              {"Intrest Rate (In %)"}
            </label>
            <input
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full py-2 px-4 border-b-black border-b-2 focus:outline-none"
              id="rate"
              type="number"
              placeholder="Rate"
            />
          </div>
          <div>
            <label htmlFor="fee" className="block text-lg font-bold my-2">
              {"Processing Fee (In %)"}
            </label>
            <input
              value={fee}
              onChange={(e) => setFee(Number(e.target.value))}
              className="w-full py-2 px-4 border-b-black border-b-2 focus:outline-none"
              id="fee"
              type="number"
              placeholder="Processing Fee Rate"
            />
          </div>
          <div>
            <div>
              <p className="my-2 text-lg font-bold">Down Payment</p>
              <div>
                <div className="font-semibold underline my-4">{`total down payment ₹${calcEffDownPayment().toFixed(
                  2
                )}`}</div>
                <div className="relative">
                  <input
                    type="range"
                    value={((downPay || 1) / (total || 1)) * 100}
                    onChange={(e) => setDownPay(total * (e.target.value / 100))}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between my-2">
                  <span>0%</span>
                  <span>{`₹${downPay.toFixed(2)}`}</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className="my-2 text-lg font-bold">Lone per Month</p>
                <div>
                  <div className="font-semibold underline my-4">{`total loan to be pay ₹${lone}`}</div>
                  <div className="relative">
                    <input
                      type="range"
                      value={(lone / (year * 12 * a())) * 100}
                      onChange={(e) =>
                        setLone((e.target.value / 100) * a() * year * 12)
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between my-2">
                    <span>₹0</span>
                    <span>{`₹${(lone / (year * 12)).toFixed(2)}`}</span>
                    <span>{`₹${a().toFixed(2)}`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="my-4">Tenure</p>
              <div className="flex gap-1 justify-around">
                {yearOption.map((item, index) => (
                  <button
                    className={`${
                      year === item ? "bg-blue-400" : "bg-gray-400"
                    } rounded-[1rem] text-white py-2 px-4`}
                    name={item.toString()}
                    key={index}
                    onClick={(e) => setYear(Number(e.target.name))}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
