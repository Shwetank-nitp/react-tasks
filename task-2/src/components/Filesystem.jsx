import { useEffect, useRef, useState } from "react";

function FileSystem({ data }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const [isAdding, setIsAdding] = useState({ status: false, type: null });

  function addItem(e) {
    e.stopPropagation();
    setOpen(true);
    setIsAdding({ status: true, type: e.target.name });
  }

  function handleAddItem() {
    if (!inputRef.current.value) {
      return;
    }
    data.children = [
      ...data.children,
      { name: inputRef.current.value, type: isAdding.type, children: [] },
    ];
    setIsAdding({ status: false, type: null });
    inputRef.current.value = "";
  }

  function handleBlue() {
    setIsAdding({ status: false, type: null });
    inputRef.current.value = "";
  }
  return (
    <div className="struct">
      <div
        onClick={() => {
          setOpen(!open);
          setIsAdding({ status: false, type: null });
        }}
        className="item"
      >
        <span className="item-name-box">
          {data.type === "folder"
            ? open
              ? "📂 " + data?.name
              : "📁 " + data?.name
            : "📄 " + data?.name}
        </span>
        {data.type === "folder" && (
          <div className="options">
            <button onClick={addItem} name="file" className="add-btn">
              + add file
            </button>
            <button onClick={addItem} name="folder" className="add-btn">
              + add folder
            </button>
          </div>
        )}
      </div>

      <div className="sub-item" style={{ display: open ? "block" : "none" }}>
        <div
          style={{
            display: isAdding.status ? "inline-block" : "none",
            marginLeft: "1rem",
          }}
          onBlur={handleBlue}
        >
          <span>{isAdding.type === "file" ? "📄" : "📁"}</span>
          <input
            placeholder="add here"
            ref={inputRef}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem();
              }
            }}
          />
        </div>
        {data.children.map((item, index) => (
          <FileSystem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default FileSystem;
