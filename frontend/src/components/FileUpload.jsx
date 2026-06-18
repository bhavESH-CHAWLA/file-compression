import { useRef, useState } from "react";
import axios from "axios";
import { FaUpload, FaFileAlt, FaDownload } from "react-icons/fa";

function FileUpload({ setCompressionData }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadFile, setDownloadFile] = useState("");

  const fileInputRef = useRef();

  const handleCompress = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/compress",
        formData
      );

      setCompressionData(response.data);
      setDownloadFile(response.data.filename);

      alert("Compression Successful!");
    } catch (err) {
      console.error(err);
      alert("Compression Failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">

      <div className="bg-gray-900 rounded-2xl p-10 border-2 border-dashed border-blue-500 shadow-xl">

        <div className="flex flex-col items-center gap-6">

          <FaUpload className="text-5xl text-blue-400" />

          <h2 className="text-3xl font-bold text-white">
            Upload File
          </h2>

          {/* Hidden Input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* Select File Button */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white"
          >
            Select File
          </button>

          {file && (
            <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl w-full justify-center">

              <FaFileAlt className="text-blue-400" />

              <span className="text-white">
                {file.name}
              </span>

            </div>
          )}

          <button
            onClick={handleCompress}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl text-white"
          >
            {loading ? "Compressing..." : "Compress File"}
          </button>

          {downloadFile && (
            <a
              href={`http://localhost:5000/download/${downloadFile}`}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-white flex items-center gap-3"
            >
              <FaDownload />
              Download .huff
            </a>
          )}
        </div>

      </div>

    </div>
  );
}

export default FileUpload;