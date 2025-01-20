const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const basePath = 'C:\\foresight\\src\\components\\data_upload\\dat_server_files';
const rScriptPath = path.join(basePath, 'foresight_extractor.R');

if (!fs.existsSync(rScriptPath)) {
    console.error('R script not found at', rScriptPath);
    process.exit(1);
}
const upload = multer({ dest: path.join(basePath, 'uploads') });

app.post('/upload-dat', upload.single('datFile'), (req, res) => {
    const datFilePath = req.file.path;
    const command = `Rscript ${rScriptPath} ${datFilePath}`;

    exec(command, (error, stdout, stderr) => {
        fs.unlinkSync(datFilePath);

        if (error) {
            console.error(`Error executing R script: ${stderr}`);
            return res.status(500).json({ error: 'Error processing file.' });
        }
        const outputLines = stdout.split('\n');
        const csvFilePath = outputLines.find(line => line.trim().endsWith('.csv'));

        if (!csvFilePath || !fs.existsSync(csvFilePath)) {
            return res.status(500).json({ error: 'CSV file not found.' });
        }
        fs.readFile(csvFilePath, 'utf8', (readError, data) => {
            fs.unlinkSync(csvFilePath);
            if (readError) {
                console.error(`Error reading CSV file: ${readError}`);
                return res.status(500).json({ error: 'Error reading CSV file.' });
            }

            const rows = data.split('\n').map(row => row.split(','));
            const headers = rows.shift();
            const jsonData = rows
                .filter(row => row.length === headers.length)
                .map(row =>
                    headers.reduce((acc, header, index) => {
                        acc[header] = row[index];
                        return acc;
                    }, {})
                );

            res.status(200).json(jsonData);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
