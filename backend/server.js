const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { execFile } = require("child_process");

const app = express();
const uploadDirectory = path.join(__dirname, "uploads");
const compressedDirectory = path.join(__dirname, "compressed");
const allowedOrigins = (
  process.env.FRONTEND_URL ||
  "http://localhost:5173,https://file-compression-6u53.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim());

fs.mkdirSync(uploadDirectory, { recursive: true });
fs.mkdirSync(compressedDirectory, { recursive: true });

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  }
}));

app.use(express.json());

const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname.replace(/[\\/]/g, "_")));
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

    const inputPath = req.file.path;

    const outputFileName =
        req.file.filename + ".huff";

    const outputPath = path.join(
        compressedDirectory,
        outputFileName
    );

    const exePath = path.join(
        __dirname,
        "..",
        "cpp",
        process.platform === "win32" ? "huffman.exe" : "huffman"
    );

    execFile(
        exePath,
        [inputPath, outputPath],
        (error, stdout, stderr) => {

            if (error) {

                return res.status(500).json({
                    success: false,
                    error: stderr || error.message
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
        compressedDirectory,
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
        compressedDirectory
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

const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {

    console.log(
        `Server running on port ${port}`
    );

});