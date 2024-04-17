import { createObjectCsvWriter } from "csv-writer";

const csvWriter = createObjectCsvWriter({
  path: "./output/output.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "artists", title: "Artists" },
    { id: "album", title: "Album" },
    { id: "release_year", title: "Release_year" },
    { id: "duration", title: "Duration" },
    { id: "popularity", title: "Popularity" },
    { id: "id", title: "Id" },
  ],
});

export function saveArrayToCSV(array) {
  if(!array.length){
    console.log("Array is empty, nothing to write to CSV");
    return;
  }

  csvWriter
    .writeRecords(array)
    .then(() => console.log("CSV file successfully written"))
    .catch((err) => console.error("Error writing CSV file:", err));
}
