import { useEffect, useState } from "react";

import ChartComponent from "./ChartComponent";

function App() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentChart, setCurrentChart] = useState(data[0]);
  const [current, setCurrent] = useState(0);
  const max = data.length;

  const getData = async () => {
    setloading(true);
    const response = await fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json"
    );
    const result = await response.json();
    setData(result);
    setCurrentChart(result[0]);
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  let chartData = {
    labels: currentChart?.elements,
    datasets: [
      {
        label: "Dataset 1",
        data: currentChart?.elements,
        backgroundColor: [
          "#dd2e1f",
          "#ff8d27",
          "#008c23",
          "#3171ce",
          "#f1c40f",
          "#16a085",
        ],
      },
    ],
  };

  const hanldeNext = () => {
    if (current < max) {
      setCurrent(current + 1);
      setCurrentChart(data[current]);
    }
  };
  const hanldePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setCurrentChart(data[current]);
    }
  };

  console.log(currentChart, current);
  const tp = currentChart?.type;
  if (!loading) {
    return (
      <div>
        <ChartComponent
          type={tp === "Bar" ? "bar" : "pie"}
          chartData={chartData}
          key={tp}
        />

        <button
          onClick={hanldePrevious}
          disabled={current === 0 ? true : false}
        >
          Last
        </button>
        <button onClick={hanldeNext} disabled={current === max ? true : false}>
          Next
        </button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default App;
