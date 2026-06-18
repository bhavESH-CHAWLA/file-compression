import { useState, useRef } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

function Decompress() {

  const [file, setFile] = useState(null);

  const fileInputRef = useRef();

  const handleDecompress = async () => {

    if (!file) {
      alert("Select a .huff file first");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response = await axios.post(
        "http://localhost:5000/decompress",
        formData,
        {
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;
      link.download = "decompressed_file.txt";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {

      console.log(err);

      alert("Decompression failed");

    }

  };

  return (

    <div className="mt-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Decompress File
      </h2>

      <div className="bg-gray-900 p-10 rounded-2xl text-center">

        <input
          type="file"
          accept=".huff"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="bg-blue-600 px-8 py-3 rounded-xl"
          onClick={() => fileInputRef.current.click()}
        >
          Choose File
        </button>

        <div className="mt-4 text-gray-300">
          {file ? file.name : "No file selected"}
        </div>

        <button
          onClick={handleDecompress}
          className="
            mt-8
            bg-green-600
            px-8
            py-3
            rounded-xl
          "
        >

          <FaUpload className="inline mr-2" />

          Decompress

        </button>

      </div>

    </div>

  );

}

export default Decompress;