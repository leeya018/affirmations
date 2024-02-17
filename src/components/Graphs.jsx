import React from "react"

import StackChart from "./StackChart"
// import { userStore } from "@/mobx/userStore"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { observer } from "mobx-react-lite"
import { userStore } from "@/mobx/userStore"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Graphs = observer(() => {
  const { user } = userStore

  return (
    <div className="  w-full shadow-rl rounded-xl bg-white h-[85vh] shadow-lg flex justify-center items-center md:w-[90vw] ">
      <div className="w-full flex justify-center items-center  h-[80vh] px-2 md:w-[90%]  md:p-0">
        <StackChart practices={user?.practices || []} />;
      </div>
    </div>
  )
})

export default Graphs
