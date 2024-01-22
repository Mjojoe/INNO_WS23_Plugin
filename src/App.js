import "./App.css";
import React,{ Component, useEffect, useState } from "react";

function App() {
  const [selection, setSelection] = useState("");
  useEffect(() => {
    getDataToDisplay();
  }, []);

  function getDataToDisplay() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage( tabs[0].id, { message: "getTableData" },
        function (response) {
          const selection = response;
          setSelection(selection);
        }
      );
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">My Chrome Extension</h1>
      </header>
    </div>
  );
}

export default App;

