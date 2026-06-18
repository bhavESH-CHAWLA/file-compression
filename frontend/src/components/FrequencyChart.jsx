import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function FrequencyChart({ frequencies }) {

  if (!frequencies)
    return null;

  const data = Object.entries(frequencies).map(
    ([char, freq]) => ({
      char:
        char === " "
          ? "space"
          : char,
      frequency: freq,
    })
  );

  return (

    <div className="mt-10">

      <h2 className="text-3xl font-bold text-center mb-8">

        Frequency Analysis

      </h2>

      <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">

        <ResponsiveContainer
          width="100%"
          height={500}
        >

          <BarChart data={data}>

            <XAxis dataKey="char" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="frequency"
              fill="#3b82f6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default FrequencyChart;