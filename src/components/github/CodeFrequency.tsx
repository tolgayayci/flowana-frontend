import useCodeFrequency from "@/models/github/useCodeFrequency";

import ReactECharts from "echarts-for-react";

export default function CodeFrequency() {
  const { codeFrequency } = useCodeFrequency("polkadot");

  return (
    <div>
      <h1>Code Frequency</h1>
      {JSON.stringify(codeFrequency, null, 2)}
    </div>
  );
}
