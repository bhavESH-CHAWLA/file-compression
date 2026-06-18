const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.get("/", (req, res) => {
    res.send("File Compression Backend Running");
});

app.post("/compress", upload.single("file"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    const inputPath = path.join(
        __dirname,
        "uploads",
        req.file.originalname
    );

    const outputFileName =
        req.file.originalname + ".huff";

    const outputPath = path.join(
        __dirname,
        "compressed",
        outputFileName
    );

    const exePath = path.join(
    __dirname,
    "..",
    "cpp",
    "huffman"
);

    exec(
        `"${exePath}" "${inputPath}" "${outputPath}"`,
        (error, stdout, stderr) => {

            if (error) {

                return res.status(500).json({
                    success: false,
                    error: stderr
                });

            }

            const jsonPath = outputPath + ".json";

            if (!fs.existsSync(jsonPath)) {

                return res.status(500).json({
                    success: false,
                    message: "Metadata json not found"
                });

            }

            const metadata =
                JSON.parse(
                    fs.readFileSync(
                        jsonPath,
                        "utf8"
                    )
                );

            res.json({

                success: true,

                filename: outputFileName,

                original_size:
                    metadata.original_size,

                compressed_size:
                    metadata.compressed_size,

                compression_ratio:
                    metadata.compression_ratio,

                frequencies:
                    metadata.frequencies,

                final_codes:
                    metadata.final_codes,

                tree_steps:
                    metadata.tree_steps

            });

        }
    );
});

app.get("/download/:filename", (req, res) => {

    const filePath = path.join(
        __dirname,
        "compressed",
        req.params.filename
    );

    if (!fs.existsSync(filePath)) {

        return res.status(404).json({
            success: false,
            message: "File not found"
        });

    }

    res.download(filePath);

});

app.get("/files", (req, res) => {

    const folderPath = path.join(
        __dirname,
        "compressed"
    );

    fs.readdir(folderPath, (err, files) => {

        if (err) {

            return res.status(500).json({
                success: false
            });

        }

        res.json(files);

    });

});

app.listen(5000, () => {

    console.log(
        "Server running on port 5000"
    );

});