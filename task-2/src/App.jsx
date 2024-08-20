import { useState } from "react";
import { folderData } from "./data/folderData";
import FileSystem from "./components/Filesystem";

function App() {
  const data = folderData;
  return (
    <div className="file-sys-box">
      <FileSystem data={data} />
    </div>
  );
}

export default App;
