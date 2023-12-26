import express from "express";
import ExcelJS from 'exceljs';

const app = express();

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

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');

    workbook.xlsx.write(res)
        .then(() => {
            // End the response stream
            res.end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

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