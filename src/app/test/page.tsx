"use client"

import { addUserApi, getAffirmationsApi } from "@/api"
import { User } from "@/api/user/interfaces"
import { serverTimestamp } from "firebase/firestore"
import React, { useEffect } from "react"

const newUser: User = {
  userId: "034802934890238",
  displayName: "lee",
  email: "lee@example.com",
  //   createdDate: serverTimestamp(),
}
export default function index() {
  return (
    <div
      className="w-full  h-[100vh] flex flex-col  justify-center items-center gap-10
    "
    >
      <div className="font-bold text-xl">affirmations-dev</div>

      <button
        onClick={() => addUserApi(newUser)}
        className=" border-2 border-black rounded-xl bg-blue text=white px-6 py-4"
      >
        addUserApi
      </button>
    </div>
  )
}
