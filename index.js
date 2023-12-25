// import express from 'express';
// import cors from 'cors'

// const app = express();
// const port = 5000;

// app.use(express.json())
// app.use(cors())

// // import adminRoute from "./src/routes/admin/admin.route.js";
// import adminRoute from "@folder1/admin.route.js";

// app.use("/use", adminRoute);

// app.get('/', (req, res) => {
//     console.log("hello")
//   res.send('Hello, this is a simple Express application using modules!');
// });


// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
import { data } from "./data.js";
import { item } from "./item.js";
import  fs  from "fs";


const keys = Object.keys(data);

const values = Object.values(item);

const filePath = "output.json";



let final = {}

keys.forEach((data, index) => {
  final[data] = values[index]
});

const jsonString = JSON.stringify(final, null, 2);

fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('JSON file has been saved:', filePath);
  }
});


// const filePath2 = 'example.txt';

// // Reading from a file
// fs.readFile(filePath2, 'utf-8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//   } else {
//     console.log('File content:', data);
//   }
// });



