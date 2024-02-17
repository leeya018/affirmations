import moment from "moment"
export const formatSeconds = (second) => {
  const date = new Date(null)
  date.setSeconds(second) // specify value for SECONDS here
  const result = date.toISOString().slice(11, 19)
  return result
}
export const getTime = (date) => {
  return moment(date).format("hh:mm:ss a")
}

export const sleep = async (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, time)
  )

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
}

export const getDayArr = (month, year) => {
  const date = new Date(year, month, 1)
  const days = []

  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return days
}

export const formatDate = (date) => {
  return moment(date).format("DD-MM-YYYY")
}
export const isSameDay = (d1, d2) => {
  console.log("isSameDay", formatDate(moment(d1)), formatDate(moment(d2)))
  return formatDate(moment(d1)) === formatDate(moment(d2))
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

export const storageNames = {
  audios: "audios",
  images: "images",
}

// export const NavNames = {
//   home: "",
//   login: "login",
//   signup: "signup",
// }

export const practiceType = {
  TYPE: "type",
  VOICE: "voice",
}
export const folderNames = {
  IMAGES: "images",
  AUDIOS: "audios",
}
