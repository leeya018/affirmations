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
import { addPracticeApi, getAffirmationsApi } from "@/api"
import { Practice } from "@/api/practice/interfaces"
import LeftNav from "@/features/LeftNav"
import Alerts from "@/components/Alerts"
import SuccessModal from "@/components/modal/message/success"
import { affirmationsStore } from "@/mobx/affirmationsStore"
import { AudioStore } from "@/mobx/audioStore"
import { Affirmation } from "@/api/affirmation/interfaces"

const index = () => {
  const { selectedName } = navStore
  const [txt, setTxt] = useState("")
  const [affirmations, setAffirmations] = useState<any[]>([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (userStore.user) {
      getAffirmationsApi(userStore.user.uid)
        .then((affirmation) => {
          affirmationsStore.updateAffirmation(affirmation)
          if (!affirmation?.audioUrl) throw new Error("audio url is not exists")
          AudioStore.setSound(affirmation.audioUrl)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [userStore.user])

  useEffect(() => {
    if (
      affirmations.length >= Number(process.env.NEXT_PUBLIC_AFFIRMATION_LIM)
    ) {
      ModalStore.openModal(modals.db_add_type)
    }
  }, [affirmations])

  const handleKeyDown = (e: any) => {
    console.log("handleKeyDown")
    console.log(e.code === "Enter")
    if (e.code === "Enter") {
      if (txt.split(" ").length < 3) return null
      setAffirmations((prev: any[]) => [
        ...prev,
        { name: txt, date: new Date() },
      ])
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
      <div>
        {modals.db_add_type === ModalStore.modalName && (
          <SuccessModal
            title={"Done workout"}
            message={"You finish the typing workout "}
            onClick={() => {
              addPractice(practiceType.TYPE)
              ModalStore.closeModal()
            }}
            btnTxt={"Save Score"}
          />
        )}
        {modals.db_add_voice === ModalStore.modalName && (
          <SuccessModal
            title={"Done workout"}
            message={"You finish the voice workout "}
            onClick={() => {
              addPractice(practiceType.VOICE)
              ModalStore.closeModal()
            }}
            btnTxt={"Save Score"}
          />
        )}
      </div>
      <div
        className="w-full h-[100vh] flex flex-col  items-center
      overflow-hidden bg-[#F3F3F7]  "
      >
        <Nav />
        {/* <button onClick={() => addPractice(practiceType.TYPE)}>
          add pracice sound{" "}
        </button> */}

        <div
          className="w-full flex h-[85vh] mt-5 flex-col gap-2 
        md:flex-row md:justify-around md:gap-0 md:px-5 "
        >
          <LeftNav />

          {selectedName === navNames.home && (
            <div className="flex justify-around gap-4 md:w-[90vw]">
              <Left
                handleKeyDown={handleKeyDown}
                setTxt={setTxt}
                affirmations={affirmations}
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
