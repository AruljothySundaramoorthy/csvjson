const fs = require("fs");
const csvParser = require("csv-parser");

// Replace these file paths with your input and output file paths
const csvFilePath = "./userdata.csv";
const jsonFilePath = "./output.json";

// Function to convert CSV to JSON
const convertCsvToJson = (csvFilePath, jsonFilePath) => {
  const jsonArray = [];

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (row) => {
      jsonArray.push(row);
    })
    .on("end", () => {
      const jsonData = JSON.stringify(jsonArray, null, 2);
      fs.writeFile(jsonFilePath, jsonData, (err) => {
        if (err) {
          console.error("Error writing JSON file:", err);
        } else {
          console.log("CSV to JSON conversion complete.");
        }
      });
    });
};

// Call the function to convert the CSV to JSON
convertCsvToJson(csvFilePath, jsonFilePath);
