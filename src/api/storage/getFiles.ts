import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "@/firebase"

export const getFilesApi = async (uid: string, folderName: string) => {
  try {
    const storageRef = ref(storage, `users/${uid}/${folderName}`)

    const res = await listAll(storageRef)

    const fileInfoPromises = res.items.map((itemRef) => {
      return getDownloadURL(itemRef).then((url) => {
        return {
          name: itemRef.name,
          url: url,
        }
      })
    })

    const files = await Promise.all(fileInfoPromises)
    console.log(files)
    return files
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}
