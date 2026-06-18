import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";

function CodesTable({ codes }) {

  const [copied, setCopied] = useState("");

  if (!codes) return null;

  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Huffman Codes
      </h2>

      <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">

        <table className="w-full">

          <thead className="bg-blue-600">

            <tr>
              <th className="p-4">Character</th>
              <th className="p-4">Code</th>
              <th className="p-4">Copy</th>
            </tr>

          </thead>

          <tbody>

            {
              Object.entries(codes).map(([char, code]) => (

                <tr
                  key={char}
                  className="border-b border-gray-700"
                >

                  <td className="p-4">
                    {
                      char === " "
                        ? "space"
                        : char
                    }
                  </td>

                  <td className="p-4 font-mono">
                    {code}
                  </td>

                  <td className="p-4">

                    <CopyToClipboard
                      text={code}
                      onCopy={() => setCopied(char)}
                    >

                      <button
                        className="
                        bg-gray-700
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-gray-600
                        "
                      >

                        <FaCopy />

                      </button>

                    </CopyToClipboard>

                    {
                      copied === char &&
                      <span className="ml-3 text-green-400">
                        Copied!
                      </span>
                    }

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CodesTable;