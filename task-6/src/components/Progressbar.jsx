export function Progressbar({ value, style, ...props }) {
  const percentage = value <= 100 ? value : 100;
  console.log(value);
  return (
    <div
      className={`overflow-hidden outline-1 w-[50%] outline rounded-lg flex justify-center items-center relative ${style}`}
      {...props}
    >
      <div
        className="absolute -z-10 top-0 left-0 w-full h-full bg-green-400 origin-left"
        style={{ transform: `scaleX(${percentage / 100})` }}
        role="progressbar"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percentage.toFixed(0)}
      ></div>
      <span style={{ color: percentage > 50 ? "white" : "black" }}>
        {`${percentage.toFixed(0)}%`}
      </span>
    </div>
  );
}
