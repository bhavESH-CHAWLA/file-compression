function UploadBox({
    selectedFile,
    setSelectedFile,
    handleCompress,
    loading
}) {

    return (
        <div>

            <h2>Select File</h2>

            <input
                type="file"
                onChange={(e) =>
                    setSelectedFile(e.target.files[0])
                }
            />

            <br />
            <br />

            {selectedFile &&
                <div>
                    Selected:
                    <strong>
                        {" "}
                        {selectedFile.name}
                    </strong>
                </div>
            }

            <br />

            <button
                onClick={handleCompress}
                disabled={loading}
            >
                {
                    loading
                        ? "Compressing..."
                        : "Compress File"
                }
            </button>

        </div>
    );
}

export default UploadBox;