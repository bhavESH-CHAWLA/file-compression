import { motion } from "framer-motion";

function TabNavigation({
  activeTab,
  setActiveTab
}) {

  const tabs = [
  "upload",
  "frequency",
  "tree",
  "codes",
  "analysis"
];

  return (

    <div className="flex justify-center gap-4 mt-8 flex-wrap">

      {

        tabs.map(tab => (

          <motion.button

            key={tab}

            whileHover={{
              scale: 1.1
            }}

            onClick={() =>
              setActiveTab(tab)
            }

            className={`

              px-5 py-3
              rounded-lg
              capitalize
              transition

              ${
                activeTab === tab
                ? "bg-blue-500"
                : "bg-gray-700"
              }

            `}

          >

            {tab}

          </motion.button>

        ))

      }

    </div>

  );

}

export default TabNavigation;