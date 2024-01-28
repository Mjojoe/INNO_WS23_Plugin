import "./App.css";
import LineChart from "./components/LineChart";
import React, { Component, useEffect, useRef, useState } from "react";

const StorageDataKey = "TableData"
const initialData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 
  datasets: [{
    label: "Blutwerte", data: [3, 4, 9, 12, 8, 4, 10]
  }]
}

function App() {
  const [lables, setLables] = useState(() => { });
  const [dataSets, setDataSets] = useState(() => { });
  const [data, setData] = useState(() => { return initialData })
  const isMounted = useRef(false)
  const haveData = useRef(false)

  function getTable() {
    haveData.current=true
    const tableData = {
      datasets: dataSets,
      labels: lables
    }
    setData(tableData)
  }

  function getDataSets() {
    const dataLables = [];
    const data = [];
    for (const [index, row] of JSON.parse(localStorage.getItem(StorageDataKey)).entries()) {
      if (index === 0) continue;
      const dataRow = [];
      for (const [index, cell] of row.entries()) {
        if (index === 0) {
          dataLables.push(cell);
          continue;
        }
        dataRow.push(parseInt(cell));
      }
      data.push(dataRow);
    }

    const tableDataSets = [];
    for (const [index, dataset] of data.entries()) {
      tableDataSets.push({
        data: dataset,
        label: dataLables[index]
      })
    }
    setDataSets(tableDataSets)
  }
  
  function getLables() {
    const lables = JSON.parse(localStorage.getItem(StorageDataKey))[0]
    lables.shift()
      setLables(lables)
      getDataSets();
  }

  function getDataToDisplay() {
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "getTableData" },
        function (response) {
          localStorage.setItem(StorageDataKey, response)
        }
      );
    })
  }

  useEffect(() => {
    getDataToDisplay()
    setTimeout(() => {
      getLables()
    }, 1000)
  }, []);

  useEffect(()=>{
    if(isMounted.current){
      getTable()
    }
    else {
      isMounted.current = true;
    }
  },[dataSets])


  if(haveData.current){
    console.log(data)
    return (
      <div className="Chart">
        <h1>Blutwerte</h1>
        <div style={{ width: 800 }}>
          <LineChart chartData={data}/>
        </div>
      </div>
    );
  }
    return <div>Loading...</div>

}
export default App;

