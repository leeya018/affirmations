import React, { useEffect, useState } from "react"
import Image from "next/image"

import Person2Icon from "@mui/icons-material/Person2"
import { observer } from "mobx-react-lite"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"
import { IoMdExit } from "react-icons/io"

import { userStore } from "@/mobx/userStore"
import { TooltipDefault } from "@/ui/Tooltip"

const Nav = observer(() => {
  const [photoURL, setPhotoURL] = useState("")
  const [displayName, setDisplayName] = useState("")
  const router = useRouter()

  const logout = () => {
    signOut(auth)
    userStore.setUser(null)

    router.push("/login")
  }
  const getProfileImage = () => {
    // console.log(toJS(userStore.user))
    if (photoURL) {
      return (
        <Image
          alt="profile image"
          width={32}
          height={32}
          className="rounded-lg "
          src={photoURL}
        />
      )
    } else {
      return (
        <div className="flex gap-2 p-2  ">
          <Person2Icon className="w-10 h-10   ml-auto cursor-pointer" />
        </div>
      )
    }
  }

  return (
    <div className="bg-color-white  py-2  w-full flex justify-between items-center text-black px-2 md:px-10">
      <div className="flex items-center gap-2">
        <Image
          alt="profile image"
          width={32}
          height={32}
          className="rounded-lg "
          src={"/trophy.png"}
        />
      </div>
      <div className="flex justify-between items-center  gap-4">
        <div>
          <TooltipDefault text="Logout">
            <IoMdExit size={20} color="gray" onClick={logout} />
          </TooltipDefault>
        </div>

        <div className="">{getProfileImage()}</div>

        <div className="font-medium">hello , {displayName}</div>
      </div>
    </div>
  )
})

export default Nav
