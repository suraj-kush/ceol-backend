import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export function saveArrayToCSV(array, fileName) {
    if (!array) {
        throw new Error("Array is undefined or null.");
    }
    
    const filePath = path.join(__dirname, "data", `${fileName}.csv`);
    const csvData = array.map((obj) => Object.values(obj).join(",")).join("\n");
    // const header = Object.keys(array[0]).join(",");
    fs.writeFileSync(filePath,csvData);
}

