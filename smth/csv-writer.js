const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = "logs.csv";
const header = [
  {
    id: "id",
    title: "id",
  },
  {
    id: "message",
    title: "message",
  },
  {
    id: "timestamp",
    title: "timestamp",
  },
];
const data = [
  { id: 0, message: "message1", timestamp: "localtime1" },
  { id: 1, message: "message2", timestamp: "localtime2" },
  { id: 2, message: "message3", timestamp: "localtime3" },
];
const csvWriter = createCsvWriter({ path, header });
csvWriter
  .writeRecords(data)
  .then(() => console.log("The CSV file was written successfully!"))
  .catch((err) => console.error("Error: ", err));
