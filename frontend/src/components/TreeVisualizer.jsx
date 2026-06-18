import React from "react";

function TreeVisualizer({ treeSteps }) {

  if (!treeSteps || treeSteps.length === 0)
    return null;

  return (

    <div className="mt-10">

      <h2
        className="
        text-3xl
        font-bold
        text-center
        mb-8
        "
      >
        Tree Construction Steps
      </h2>

      <div
        className="
        bg-gray-900
        rounded-2xl
        p-8
        "
      >

        <div className="space-y-4">

          {treeSteps.map((step, index) => (

            <div
              key={index}
              className="
              flex
              justify-between
              bg-gray-800
              rounded-xl
              p-4
              "
            >

              <span>
                Merge Step {index + 1}
              </span>

              <span className="font-bold text-green-400">
                Frequency = {step.freq}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default TreeVisualizer;