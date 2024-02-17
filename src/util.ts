import { Timestamp } from "firebase/firestore"
import moment from "moment"

const { v4: uuidv4 } = require("uuid")

export const NavNames = {
  login: "/login",
  home: "/",
  view: "/view",
  about: "/about",
}

const sleep = (waitTime = null) => {
  const time = waitTime ? waitTime : (Math.random() * 3 + 1) * 1000
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      return resolve("done")
    }, time)
  })
}

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
}

export const isDev = () => process.env.NODE_ENV === "development"

const getDate = () => {
  // add 3 hours for the isreal time zone
  const miliseconds = new Date().getTime() + +3 * 60 * 60 * 1000
  return new Date(miliseconds).toISOString()
}

const minute = 1000 * 60
const hour = 1000 * 60 * 60
export const day = hour * 24
const week = day * 7
const second = 1000

let likes = 0
let passes = 0
const likesLimit = 100
const daysForDel = 8
const waitTime = 10000

export const intervalForever = async (callback: Function, rate: number) => {
  let intervalNum = 0
  while (true) {
    intervalNum++
    console.log(`interval ${callback.name}: ${intervalNum}  ${getDate()}`)
    await callback()

    await sleep(rate)
  }
}

const convertPrediction = (prediction) => {
  try {
    const result = prediction.reduce((acc, item) => {
      acc[item.class] = item.score
      return acc
    }, {})
    return result
  } catch (error) {
    console.log("convertPrediction function", error.message)
  }
}

export const modals = {
  message: "message",
}

export const instructions = [
  "more matches",
  "more likes",
  "send first messages",
  "send first messages according the your search location",
  "can select girls in your taste",
  "choose according to preference of love between : trans , sex and relationship",
]

export const fromTimestampToMoment = (date: Timestamp) => {
  const jsDate = date.toDate()
  const dateStr = moment(jsDate).format("YYYY-MM-DD")
  const momentDate = moment(dateStr, "YYYY-MM-DD")
  return momentDate
}

export const lookForOptions: any = {
  trans: "trans",
  relationship: "relationship",
  sex: "sex",
}

export const transWords = [
  "trans",
  "transgender",
  "ladyboy",
  "טרנס",
  "טראנס",
  "shemale",
]

export const relationshipWords = [
  "Long-term partner",
  "Long-term, open to short",
  //  "New friends"
]
export const sexWords = [
  "Still figuring it out",
  "Long-term, open to short",
  "Short-term, open to long",
  "Short-term fun",
]

export const fileStarterNames = {
  english: "english",
  hebrew: "hebrew",
  spanish: "spanish",
}

// export const relationship = [
//   "long-term",
//   "no hookups",
//   "for serious",
//   "family-oriented",
//   "קשר אמיתי",
//   "קשר רציני",
//   "משפחה",
// ]
// export const sex = [
//   "friends with benefits",
//   "Nothing serious",
//   "looking to meet new people",
//   "not looking for anything serious",
//   "קשר לא מחייב",
//   "משהו קליל",
// ]
