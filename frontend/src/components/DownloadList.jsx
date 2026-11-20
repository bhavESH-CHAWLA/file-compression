import API_URL from "../api";

function DownloadList({ files }) {
    return (

        <div>

            <h2>Compressed Files</h2>

            {
                files.length === 0
                    ? <p>No files yet</p>
                    :
                    files.map((file, index) => (

                        <div
                            key={index}
                            style={{
                                marginBottom: "20px"
                            }}
                        >

                            {file}

                            <br />

                            <a
                                href={`${API_URL}/download/${encodeURIComponent(file)}`}
                            >
                                Download
                            </a>

                        </div>

                    ))
            }

        </div>

    );

}

export default DownloadList;