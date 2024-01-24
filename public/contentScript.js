chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getTableData") {
      const tableDataToSend = localStorage.getItem("selectedTableData");
      sendResponse(tableDataToSend);
    }
  });


document.addEventListener("click", function (event) {
    // Check if the clicked element is a table or is contained within a table
    const table = findParentTable(event.target);
  
    if (table) {
      // Save the table data to local storage
      saveTableToLocalStorage(table);
    }
  });
  
  function findParentTable(element) {
    // Traverse up the DOM tree to find the parent table
    while (element && element.tagName !== "TABLE") {
      element = element.parentElement;
    }
  
    return element; // Returns null if no table is found
  }
  
  function saveTableToLocalStorage(table) {
    if (table) {
      localStorage.setItem("selectedTableData", JSON.stringify(getTableData(table)));    
    }
  }
  
  function getTableData(table) {
    // Extract and return the data from the table
    const tableData = [];
  
    for (const row of table.rows) {
      const rowData = [];
      for (const cell of row.cells) {
        rowData.push(cell.textContent.trim());
      }
      tableData.push(rowData);
    }
  
    return tableData;
  }
  