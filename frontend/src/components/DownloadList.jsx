function DownloadList({ files }) {

    const API = "http://localhost:5000";

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
                                href={`${API}/download/${file}`}
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