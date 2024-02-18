"use client"

import React, { useEffect, useRef, useState } from "react"
import { folderNames, modals, navNames, practiceType } from "@/util"

import { useRouter } from "next/navigation"

import navStore from "@/mobx/navStore"
import { ModalStore } from "@/mobx/modalStore"
import { userStore } from "@/mobx/userStore"
import { messageStore } from "@/mobx/messageStore"
import ProtectedRoute from "@/components/ProtectedRoute"
import Nav from "@/features/Nav"
import Left from "@/features/Left"
import Right from "@/features/Right"
import Calender from "@/components/Calender"
import Graphs from "@/components/Graphs"
import Settings from "@/features/Settings"
import { observer } from "mobx-react-lite"
import { addPracticeApi } from "@/api"
import { Practice } from "@/api/practice/interfaces"
import LeftNav from "@/features/LeftNav"
import Alerts from "@/components/Alerts"

const index = () => {
  const [affirmations, setAffirmations] = useState([])
  // const [isClient, setIsClient] = useState(false)
  const { selectedName } = navStore
  const [txt, setTxt] = useState("")
  const inputRef = useRef(null)
  const router = useRouter()

  //   useEffect(() => {
  //     if (affirmations.length == process.env.NEXT_PUBLIC_AFFIRMATION_LIM) {
  //       ModalStore.openModal(modals.success_message)
  //     }
  //   }, [affirmations])
  //   useEffect(() => {
  //     if (affirmations.length == process.env.NEXT_PUBLIC_AFFIRMATION_LIM) {
  //       ModalStore.openModal(modals.success_message)
  //     }
  //   }, [affirmations])

  const handleKeyDown = (e) => {
    console.log("handleKeyDown")
    console.log(e.code === "Enter")
    if (e.code === "Enter") {
      if (txt.split(" ").length < 3) return null
      setAffirmations((prev) => [...prev, { name: txt, date: new Date() }])
      setTxt("")
    }
  }

  const addPractice = async (type: string) => {
    try {
      const newPractice: Practice = {
        userId: userStore.user?.uid,
        type,
      }
      const data = await addPracticeApi(userStore.user.uid, newPractice)
      console.log(data)
      messageStore.setMessage("Practice added successfully", 200)

      // ModalStore.openModal(modals.success_message)
    } catch (error) {
      messageStore.setMessage("Could not add Practice ", 500)
    }
  }

  return (
    <ProtectedRoute>
      <Alerts />
      <div
        className="w-full h-[100vh] flex flex-col  items-center
      overflow-hidden bg-[#F3F3F7]  "
      >
        <Nav />
        <button onClick={() => addPractice(practiceType.VOICE)}>
          add pracice sound{" "}
        </button>

        <div
          className="w-full flex h-[85vh] mt-5 flex-col gap-2 
        md:flex-row md:justify-around md:gap-0 md:px-5 "
        >
          <LeftNav />

          {selectedName === navNames.home && (
            <div className="flex justify-around gap-4 md:w-[90vw]">
              <Left
                addPractice={addPractice}
                handleKeyDown={handleKeyDown}
                setTxt={setTxt}
                affirmations={affirmations}
                setAffirmations={setAffirmations}
                txt={txt}
                inputRef={inputRef}
              />

              <Right
                addPractice={addPractice}
                affirmations={affirmations}
                setAffirmations={setAffirmations}
              />
            </div>
          )}

          {selectedName === navNames.calender && <Calender />}
          {selectedName === navNames.insights && <Graphs />}
          {selectedName === navNames.settings && <Settings />}
        </div>
      </div>
    </ProtectedRoute>
  )
}
export default observer(index)
