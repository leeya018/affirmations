import { Timestamp } from "firebase/firestore"
import moment from "moment"

export const formatSeconds = (second: number) => {
  const date = new Date()
  date.setSeconds(second) // specify value for SECONDS here
  const result = date.toISOString().slice(11, 19)
  return result
}
export const getTime = (date: Timestamp) => {
  return moment(date).format("hh:mm:ss a")
}

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
}

export const formatDate = (date: Timestamp) => {
  return moment(date).format("DD-MM-YYYY")
}

export const formatDateTs = (timestamp: Timestamp) => {
  const date = timestamp.toDate()
  return moment(date).format("DD-MM-YYYY")
}

export const navNames = {
  home: "home",
  insights: "insights",
  calender: "calender",
  settings: "settings",
  login: "login",
}

export const modals = {
  success_message: "success_message",
  success_message_type: "success_message_type",
  success_message_voice: "success_message_voice",
  db_add_type: "db_add_type",
  db_add_voice: "db_add_voice",
  loading: "loading",
}

export const practiceType = {
  TYPE: "type",
  VOICE: "voice",
}
export const folderNames = {
  IMAGES: "images",
  AUDIOS: "audios",
}
