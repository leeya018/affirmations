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
import { Timestamp } from "firebase/firestore"
import { Practice } from "@/api/practice/interfaces"
import { formatDate, formatDateTs, practiceType } from "@/util"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Graphs = observer(() => {
  const [chartItems, setChartItems] = useState<any[]>([])

  useEffect(() => {
    getPracticesApi(userStore.user.uid, moment())
      .then((practices) => {
        console.log({ practices })
        const cItems = convertData(practices)
        console.log(cItems)
        setChartItems(cItems)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const createObjDates = () => {
    // Get the start and end of the current month
    const startOfMonth = moment().startOf("month")
    const endOfMonth = moment().endOf("month")

    // Initialize an empty object to store the dates
    const datesInMonth: any = {}

    // Loop through each day of the month
    for (
      let date = startOfMonth;
      date.isBefore(endOfMonth) || date.isSame(endOfMonth);
      date.add(1, "days")
    ) {
      const formattedDate = date.format("DD-MM-YYYY")
      datesInMonth[formattedDate] = {
        type: 0,
        voice: 0,
      }
    }
    return datesInMonth
  }

  const fillDateObj = (practiceDateObj: any, practices: Practice[]) => {
    console.log(practiceDateObj)
    const typePractices = practices.filter((p) => p.type === practiceType.TYPE)
    const voicePractices = practices.filter(
      (p) => p.type === practiceType.VOICE
    )
    for (const tp of typePractices) {
      const formattedDate = formatDateTs(tp.createdAt)
      practiceDateObj[formattedDate].type = tp.amount
    }
    for (const vp of voicePractices) {
      practiceDateObj[formatDateTs(vp.createdAt)].voice = vp.amount
    }
    console.log({ practiceDateObj })
    return practiceDateObj
  }

  const convertData = (practices: Practice[]) => {
    try {
      let practiceDateObj = createObjDates()
      practiceDateObj = fillDateObj(practiceDateObj, practices)
      let dataItems: any = []
      Object.keys(practiceDateObj).forEach((dateStr: string) => {
        dataItems.push({
          date: dateStr,
          type: practiceDateObj[dateStr].type,
          voice: practiceDateObj[dateStr].voice,
        })
      })
      console.log({ dataItems })
      return dataItems
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="  w-full shadow-rl rounded-xl bg-white h-[85vh] shadow-lg flex justify-center items-center md:w-[90vw] ">
      <div className="w-full flex justify-center items-center  h-[80vh] px-2 md:w-[90%]  md:p-0">
        <StackChart
          items={chartItems}
          label1={"Type"}
          label2={"Voice"}
          name={"Practices"}
        />
      </div>
    </div>
  )
})

export default Graphs
