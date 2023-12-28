import express from "express";
import ExcelJS from 'exceljs';
import fs from 'fs';

const app = express();

// const tempDir = './temp';
// if (fs.existsSync(tempDir)) {
//     fs.mkdirSync(tempDir);
// }

app.get('/download', (req, res) => {
    const jsonArray = [
        ['Name', 'Age', 'Country'],
        ['John Doe', 25, 'USA'],
        ['Jane Smith', 30, 'Canada'],
        ['Bob Johnson', 22, 'UK'],
    ];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    jsonArray.forEach(row => {
        worksheet.addRow(row);
    });

    const filename = `example_${Date.now()}.xlsx`;

    const filepath = `./temp/${filename}`;

    console.log(filename);

    console.log('filepath', filepath)

    // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');

    workbook.xlsx.writeFile(filepath)
        .then(() => {
            console.log('then');
            console.log(req.protocol);
            console.log(req.get('host'));
            // End the response stream
            // res.end();
            const downloadLink = `${req.protocol}://${req.get('host')}/download/${filename}`;
            console.log(downloadLink)
            res.json({ downloadLink });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.use('/download', express.static('temp'));

app.get('/sample', (req, res) => {
    res.send('Hello World!');
});

app.get('/data', (req, res) => {
    const jsonArray = [
        ['Name', 'Age', 'Country'],
        ['John Doe', 25, 'USA'],
        ['Jane Smith', 30, 'Canada'],
        ['Bob Johnson', 22, 'UK'],
    ];
    res.send({ "data": jsonArray });
});

app.get('/data2', (req, res) => {
    const jsonArray = [
        {
            "name": 'Loahit',
            "age": 21
        },
        {
            "name": 'Sujith',
            "age": 41
        },
        {
            "name": 'Monesh',
            "age": 31
        }
    ];
    res.send({ "data": jsonArray });
});

app.get('/csv', (req, res) => {
    const csvContent = `
      Name,Age,Occupation
      John Doe,30,Engineer
      Jane Smith,25,Teacher
      Bob Johnson,40,Doctor
      Alice Williams,35,Artist
    `;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

    res.send(csvContent);
  });



app.listen(3000, () => {
    console.log(`Server is listening on port 3000`)
});