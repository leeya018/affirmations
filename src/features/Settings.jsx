import React, { use, useEffect, useRef, useState } from "react"
import Image from "next/image"

import { AsyncStore } from "@/mobx/asyncStore"
import SettingsButton from "@/ui/button/settings"
import { userStore } from "@/mobx/userStore"
import { observer } from "mobx-react-lite"
import BasicSelect from "@/ui/basicSelect"
import { folderNames } from "@/util"
import { addFileApi, getFilesApi, updateAffirmationApi } from "@/api"
import { messageStore } from "@/mobx/messageStore"
import Alerts from "@/components/Alerts"

function Settings() {
  const [affirmation, setAffirmation] = useState("")
  const [isAffirmationChanged, setIsAffirmationChanged] = useState(false)
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [audioUrl, setAudioUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [audioItemOptions, setAudioItemOptions] = useState([])
  const [imageItemOptions, setImageItemOptions] = useState([])
  const [audio, setAudio] = useState(null)
  const [txtColor, setTxtColor] = useState({
    text: "text-green",
    image: "text-green",
    audio: "text-green",
  })
  const [affirmationStatus, setAffirmationStatus] = useState({
    text: "",
    image: "",
    audio: "",
  })

  useEffect(() => {
    setAffirmation(userStore.user?.affirmation)
  }, [userStore.user])

  useEffect(() => {
    getSources()
  }, [])

  const getSources = async () => {
    try {
      const { uid } = userStore.user
      const res = await Promise.all([
        getFilesApi(uid, folderNames.IMAGES),
        getFilesApi(uid, folderNames.AUDIOS),
      ])
      console.log({ res })
      setImageItemOptions(res[0])
      setAudioItemOptions(res[1])
      messageStore.setMessage("resources has been loaded successfully", 200)
    } catch (error) {
      messageStore.setMessage("There was a problem loading the resources", 500)
    }
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAffirmationStatus((prev) => ({ ...prev, image: "" }))
      setImage(event.target.files[0])
    }
  }
  const updateAffirmation = async (userInfo) => {
    try {
      console.log({ userInfo })
      const data = await updateAffirmationApi(userStore.user.uid, userInfo)

      messageStore.setMessage("affirmation name updated successfully ", 200)
    } catch (error) {
      messageStore.setMessage("Failed to update affirmation name ", 500)
    }
  }
  const onAudioChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAffirmationStatus((prev) => ({ ...prev, file: "" }))
      setAudio(event.target.files[0])
    }
  }

  const addImage = async () => {
    try {
      if (!image) {
        throw new Error("Image not found")
      }
      const downloadURL = await addFileApi(
        userStore.user.uid,
        image,
        folderNames.IMAGES
      )
      console.log({ downloadURL })
      await updateAffirmation({
        imageAffirmation: downloadURL,
      })

      messageStore.setMessage("Image added successfully", 200)
    } catch (error) {
      console.log(error)
      messageStore.setMessage("cannot upload image ", 500)
    }
  }
  const addAudio = async () => {
    try {
      if (!audio) {
        throw new Error("You have to  choose file first")
      }
      const downloadURL = await addFileApi(
        userStore.user.uid,
        audio,
        folderNames.AUDIOS
      )
      await updateAffirmation({
        audioAffirmation: downloadURL,
      })

      messageStore.setMessage("audio added successfully", 200)
    } catch (error) {
      messageStore.setMessage("cannot upload audio ", 500)
    }
  }

  return (
    <div
      className=" p-6 gap-5  rounded-xl w-[90vw] 
     h-[85vh] flex flex-col 
     items-center  bg-white  
      text-lg font-bold shadow-md"
    >
      <div className=" flex flex-col gap-4  w-[90%] items-center md:w-[50%] p-4 md:p-5">
        <Alerts />
        {/* first */}

        <div className="flex flex-col items-center gap-2 md:mr-auto ">
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <input
              dir="rtl"
              ref={inputRef}
              type="text"
              value={affirmation}
              onChange={(e) => {
                setAffirmationStatus((prev) => ({ ...prev, text: "" }))
                setAffirmation(e.target.value)
                setIsAffirmationChanged(true)
              }}
              placeholder="Type your short suggestion "
              className="border-2 border-[#d4d6db] rounded-md w-[20rem] h-12 pr-2"
            />
            <SettingsButton
              onClick={() => updateAffirmation({ name: affirmation })}
              isDisabled={!isAffirmationChanged || affirmation.length === 0}
            >
              Update affirmation
            </SettingsButton>
          </div>
          <SettingsAlert
            text={affirmationStatus.text}
            txtColor={txtColor.text}
          />
        </div>
        {/* second */}
        <div className="flex flex-col items-center gap-2 md:mr-auto ">
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <BasicSelect
              className="w-36 h-full box-content"
              handleChange={setImageUrl}
              value={imageUrl}
              options={imageItemOptions}
              name="images select"
            />
            <SettingsButton
              onClick={() => updateAffirmation({ imageAffirmation: imageUrl })}
              isDisabled={imageUrl === null}
            >
              Update Image
            </SettingsButton>
          </div>
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <input
              type="file"
              onChange={onImageChange}
              className="filetype  border-[#d4d6db] rounded-md w-[20rem] h-12 pr-2"
            />

            <SettingsButton
              isDisabled={image === null}
              onClick={() => addImage(folderNames.IMAGES)}
            >
              Upload Image
            </SettingsButton>
            <Image
              width={32}
              height={32}
              className="rounded-lg "
              alt="preview image"
              src={image ? URL.createObjectURL(image) : ""}
            />
          </div>
          <SettingsAlert
            text={affirmationStatus.image}
            txtColor={txtColor.image}
          />
        </div>
        {/* third */}
        <div className="  flex flex-col items-center gap-2  md:mr-auto">
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <BasicSelect
              className="w-36 h-full box-content"
              handleChange={setAudioUrl}
              value={audioUrl}
              options={audioItemOptions}
              name="audio select"
            />
            <SettingsButton
              onClick={() => updateAffirmation({ audioAffirmation: audioUrl })}
              isDisabled={audioUrl === null}
            >
              Update Audio
            </SettingsButton>
          </div>
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <input
              type="file"
              onChange={onAudioChange}
              className="filetype border-[#d4d6db] rounded-md w-[20rem] h-12 pr-2"
            />

            <SettingsButton
              onClick={() => addAudio(folderNames.AUDIOS)}
              isDisabled={audio === null}
            >
              Upload Audio
            </SettingsButton>
          </div>

          <SettingsAlert
            text={affirmationStatus.audio}
            txtColor={txtColor.audio}
          />
        </div>
      </div>
    </div>
  )
}
export default observer(Settings)

function SettingsAlert({ txtColor, text }) {
  return <div className={`h-5 w-full ${txtColor}`}>{text}</div>
}
