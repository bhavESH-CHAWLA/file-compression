function Analysis({
  originalSize,
  compressedSize,
  compressionRatio
}) {

  if (!originalSize)
    return null;

  const saved =
    parseFloat(originalSize) -
    parseFloat(compressedSize);

  return (

    <div className="mt-10">

      <h2 className="text-4xl font-bold text-center mb-10">
        Compression Analysis
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h3 className="text-xl mb-4">
            Original Size
          </h3>

          <div className="text-5xl text-blue-400 font-bold">
            {originalSize} KB
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h3 className="text-xl mb-4">
            Compressed Size
          </h3>

          <div className="text-5xl text-green-400 font-bold">
            {compressedSize} KB
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h3 className="text-xl mb-4">
            Space Saved
          </h3>

          <div className="text-5xl text-yellow-400 font-bold">
            {saved.toFixed(2)} KB
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h3 className="text-xl mb-4">
            Compression Ratio
          </h3>

          <div className="text-5xl text-purple-400 font-bold">
            {compressionRatio} %
          </div>
        </div>

      </div>

    </div>

  );

}

export default Analysis;