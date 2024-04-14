const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.array('files'), (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    const folderPath = 'uploads/' + Date.now(); 
    fs.mkdirSync(folderPath); 
    files.forEach(file => {
        const filePath = folderPath + '/' + file.originalname;
        fs.renameSync(file.path, filePath);
    });
    console.log('Folder uploaded:', folderPath);
    res.json({ message: 'Folder uploaded successfully' });
});
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});