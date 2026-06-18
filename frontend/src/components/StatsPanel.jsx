import CountUp from "react-countup";

function StatsPanel({
  originalSize,
  compressedSize,
  compressionRatio
}) {

  if (
    originalSize === undefined ||
    compressedSize === undefined ||
    compressionRatio === undefined
  )
    return null;

  const original = Number(originalSize);
  const compressed = Number(compressedSize);
  const ratio = Number(compressionRatio);

  const saved = original - compressed;

  return (

    <div className="mt-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Compression Statistics
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h3>Original Size</h3>
          <div className="text-3xl font-bold text-blue-400">
            <CountUp end={original} decimals={2}/>
            KB
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h3>Compressed Size</h3>
          <div className="text-3xl font-bold text-green-400">
            <CountUp end={compressed} decimals={2}/>
            KB
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h3>Space Saved</h3>
          <div className="text-3xl font-bold text-yellow-400">
            <CountUp end={saved} decimals={2}/>
            KB
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h3>Compression Ratio</h3>
          <div className="text-3xl font-bold text-purple-400">
            <CountUp end={ratio} decimals={2}/>
            %
          </div>
        </div>

      </div>

    </div>

  );

}

export default StatsPanel;