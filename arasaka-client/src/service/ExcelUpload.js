/** @format */

import React, { useState } from "react";
import * as XLSX from "xlsx"; // Import xlsx library

function ExcelUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Read the selected Excel file
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the data is in the first sheet
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Convert worksheet data to JSON format
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("ExcelReader : ", jsonData); // This will output an array of objects representing rows
    };

    fileReader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
    </div>
  );
}

export default ExcelUpload;
