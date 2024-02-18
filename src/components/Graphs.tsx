import React, { useEffect, useState } from "react"

// import StackChart from "./StackChart"
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
import { getPracticesApi } from "@/api"
import moment from "moment"
import StackChart from "./StackChart"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Graphs = observer(() => {
  const { user } = userStore
  const [practiceItems, setPracticeItems] = useState<any[]>([])

  useEffect(() => {
    getPracticesApi(userStore.user.uid, moment())
      .then((practices) => {
        console.log({ practices })
        setPracticeItems(practices)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  console.log({ practiceItems })

  return (
    <div className="  w-full shadow-rl rounded-xl bg-white h-[85vh] shadow-lg flex justify-center items-center md:w-[90vw] ">
      <div className="w-full flex justify-center items-center  h-[80vh] px-2 md:w-[90%]  md:p-0">
        {/* <StackChart practices={user?.practices} /> */}
        {/* etsnei */}
      </div>
    </div>
  )
})

export default Graphs
