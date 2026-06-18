import { useState } from "react";

import Navbar from "./components/Navbar";
import TabNavigation from "./components/TabNavigation";
import FileUpload from "./components/FileUpload";
import FrequencyChart from "./components/FrequencyChart";
import TreeVisualizer from "./components/TreeVisualizer";
import CodesTable from "./components/CodesTable";
import Analysis from "./components/Analysis";

function App() {

  const [activeTab, setActiveTab] = useState("upload");
  const [compressionData, setCompressionData] = useState(null);

  return (

    <div className="bg-gray-950 min-h-screen text-white">

      <Navbar />

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="max-w-7xl mx-auto p-8">

        {activeTab === "upload" && (
          <FileUpload
            setCompressionData={setCompressionData}
          />
        )}

        {activeTab === "frequency" &&
          compressionData &&
          compressionData.frequencies && (

            <FrequencyChart
              frequencies={compressionData.frequencies}
            />

        )}

        {activeTab === "tree" &&
          compressionData &&
          compressionData.tree_steps && (

            <TreeVisualizer
              treeSteps={compressionData.tree_steps}
            />

        )}

        {activeTab === "codes" &&
          compressionData &&
          compressionData.final_codes && (

            <CodesTable
              codes={compressionData.final_codes}
            />

        )}

        {activeTab === "analysis" &&
        compressionData && (
    <Analysis
      originalSize={compressionData.original_size}
      compressedSize={compressionData.compressed_size}
      compressionRatio={compressionData.compression_ratio}
    />
    )}

      </div>

    </div>

  );

}

export default App;