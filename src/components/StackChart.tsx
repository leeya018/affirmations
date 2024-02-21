import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { observer } from "mobx-react-lite"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const StackChart = observer<any>(({ items, name, label1, label2 }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: name,
      },
    },
  }
  const data = {
    labels: items.map((item: any) => item.date),
    datasets: [
      {
        label: label1,
        data: items.map((item: any) => item.type),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: label2,
        data: items.map((item: any) => item.voice),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  return <Line options={options} data={data} />
})

export default StackChart
