import React, { useEffect, useState } from "react"
import Image from "next/image"
import { AiOutlinePlayCircle } from "react-icons/ai"
import { BiTime } from "react-icons/bi"
import { LiaStopCircle } from "react-icons/lia"
import Timer from "../components/Timer"
import SuccessModal from "../components/modal/message/success"
import { addPracticeApi } from "@/api"
import { ModalStore } from "@/mobx/modalStore"
import { modals, practiceType } from "@/util"
import { userStore } from "@/mobx/userStore"
import { observer } from "mobx-react-lite"
import { TfiAnnouncement } from "react-icons/tfi"
import SuccessButton from "@/ui/button/modal/success"
import { AudioStore } from "@/mobx/audioStore"
import { messageStore } from "@/mobx/messageStore"
import { Practice } from "@/api/practice/interfaces"
import { affirmationsStore } from "@/mobx/affirmationsStore"

const Right = observer<any>(
  ({ affirmations, setAffirmations, addPractice }) => {
    const [modalMessage, setModalMessage] = useState("")

    useEffect(() => {
      if (AudioStore.time > Number(process.env.NEXT_PUBLIC_AUDIO_LIM)) {
        AudioStore.stopTime()
        AudioStore.stopSound()
        ModalStore.openModal(modals.db_add_voice)
      }
    }, [AudioStore.time])

    const playSuggestion = () => {
      AudioStore.playSound()
      AudioStore.startTime()
    }
    const stopSuggestion = () => {
      AudioStore.stopSound()
      AudioStore.stopTime()
    }

    return (
      <div className="   rounded-xl  flex flex-col items-center  gap-4 w-full  md:w-[45vw] md:h-[85vh]">
        {/* <SuccessButton onClick={addPractice}>add practice</SuccessButton> */}
        <div className="p-6 bg-white w-full rounded-xl  shadow-md flex items-center justify-around text-lg font-bold">
          {/* first div */}

          <div className="flex justify-center items-center gap-2 w-full ">
            <div className="flex justify-between  items-center gap-2 w-full">
              <div className="flex gap-2">
                <BiTime size={30} onClick={playSuggestion} />
                <Timer time={AudioStore.time} />
              </div>

              <div>{"my affirmation sound"}</div>
              {AudioStore.sound?.playing() ? (
                <LiaStopCircle
                  size={30}
                  className="cursor-pointer text-[#CFCFD0]"
                  onClick={stopSuggestion}
                />
              ) : (
                <AiOutlinePlayCircle
                  size={30}
                  onClick={playSuggestion}
                  className="cursor-pointer text-[#7ED5FE]"
                />
              )}
            </div>
          </div>
        </div>
        {/* second div */}
        <div
          className="p-6 bg-white w-full rounded-xl  relative h-full
        justify-center items-center shadow-md flex"
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2  flex items-center gap-2 ">
            <TfiAnnouncement size={20} />
            <div>Image will get clearer with typing more</div>
          </div>
          <Image
            alt="affirmation image"
            width={400}
            height={400}
            className={`rounded-lg
   
        `}
            style={{
              opacity:
                affirmations.length /
                Number(process.env.NEXT_PUBLIC_AFFIRMATION_LIM),
            }}
            src={affirmationsStore.affirmation?.imageUrl || ""}
            // src={"/smile.png"}
          />
        </div>
      </div>
    )
  }
)
export default Right
