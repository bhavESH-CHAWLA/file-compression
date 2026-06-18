import { FaCompressAlt } from "react-icons/fa";

function Navbar() {

  return (

    <div
      className="
      bg-gray-900
      shadow-xl
      p-6
      "
    >

      <div
        className="
        flex
        justify-center
        items-center
        gap-5
        "
      >

        <FaCompressAlt
          className="
          text-blue-400
          text-4xl
          "
        />

        <div>

          <h1
            className="
            text-4xl
            font-bold
            text-blue-400
            "
          >

            Huffman File Compression

          </h1>

          <p
            className="
            text-gray-400
            mt-2
            "
          >

            Interactive Huffman Coding Visualization

          </p>

        </div>

      </div>

    </div>

  );

}

export default Navbar;