import { useState, useEffect } from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import { formatDate, practiceType } from "@/util"

import PieChart from "./PieChart"
import moment from "moment"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { userStore } from "@/mobx/userStore"
import { getPracticesApi } from "@/api"
import { Practice } from "@/api/practice/interfaces"
import { Dayjs } from "dayjs"
const maxPoints = 3

const Calender = observer(() => {
  const [chosenDate, setChosenDate] = useState(moment())
  const [practiceItems, setPracticeItems] = useState<Practice[] | []>([])

  useEffect(() => {
    console.log(chosenDate.month())
    getPracticesApi(userStore.user.uid, chosenDate)
      .then((practices: any) => {
        console.log({ practices })
        setPracticeItems(practices)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [chosenDate])

  const convertPracticesTiGraph = () => {
    const typeNum: number = practiceItems.filter(
      (practice: Practice) => practice.type === practiceType.TYPE
    ).length
    const voiceNum: number = practiceItems.filter(
      (practice: Practice) => practice.type === practiceType.VOICE
    ).length

    const month = chosenDate.month()
    const year = chosenDate.year()

    const specificMonth = moment(`${year}-${month + 1}`)
    const daysInMonth = specificMonth.daysInMonth()
    console.log({ daysInMonth })
    const emptyDays = daysInMonth - voiceNum - typeNum

    return [typeNum, voiceNum, emptyDays]
  }

  return (
    <div className=" flex gap-4     flex-col justify-center md:flex-row md:h-[85vh] overflow-y-auto md:overflow-hidden md:w-[90vw]">
      <div className="   rounded-xl flex flex-col bg-white items-center gap-4 shadow-md md:w-[45vw]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            orientation="portrait"
            onChange={(value: Dayjs | null) => {
              if (!value) throw new Error("value from calender is undefined")
              console.log("moment", moment(value.toDate()))
              setChosenDate(moment(value.toDate()))
            }}
          />
        </LocalizationProvider>
      </div>
      <div className=" bg-white rounded-xl flex justify-center items-center shadow-md  md:w-[45vw]">
        <PieChart items={convertPracticesTiGraph()} />
      </div>
    </div>
  )
})
export default Calender
