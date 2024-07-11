import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { AsyncStore } from "@/mobx/asyncStore";
import SettingsButton from "@/ui/button/settings";
import { userStore } from "@/mobx/userStore";
import { observer } from "mobx-react-lite";
import BasicSelect from "@/ui/basicSelect";
import { folderNames } from "@/util";
import { addFileApi, getFilesApi, updateAffirmationApi } from "@/api";
import { messageStore } from "@/mobx/messageStore";
import { affirmationsStore } from "@/mobx/affirmationsStore";

function Settings() {
  const [affirmation, setAffirmation] = useState("");
  const [isAffirmationChanged, setIsAffirmationChanged] = useState(false);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [audioItemOptions, setAudioItemOptions] = useState([]);
  const [imageItemOptions, setImageItemOptions] = useState([]);
  const [audio, setAudio] = useState(null);
  const [txtColor, setTxtColor] = useState({
    text: "text-green",
    image: "text-green",
    audio: "text-green",
  });
  const [affirmationStatus, setAffirmationStatus] = useState({
    text: "",
    image: "",
    audio: "",
  });

  useEffect(() => {
    setAffirmation(userStore.user?.affirmation);
  }, [userStore.user]);

  useEffect(() => {
    getSources();
  }, []);

  // console.log({ imageS });

  const getSources = async () => {
    try {
      const { uid } = userStore.user;
      const res = await Promise.all([
        getFilesApi(uid, folderNames.IMAGES),
        getFilesApi(uid, folderNames.AUDIOS),
      ]);
      console.log({ res, info: res[0]?.url });
      setImageUrl(res[0][0]?.url);
      setImageItemOptions(res[0]);
      setAudioItemOptions(res[1]);

      messageStore.setMessage("resources has been loaded successfully", 200);
    } catch (error) {
      messageStore.setMessage("There was a problem loading the resources", 500);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAffirmationStatus((prev) => ({ ...prev, image: "" }));
      setImage(event.target.files[0]);
    }
  };
  const updateAffirmation = async (affirmationInfo) => {
    try {
      console.log({ affirmationInfo });
      const data = await updateAffirmationApi(
        userStore.user.uid,
        affirmationInfo
      );
      affirmationsStore.updateAffirmation(affirmationInfo);

      if (affirmationInfo.imageUrl) {
        setImageUrl("");
      } else if (affirmationInfo.audioUrl) {
        setAudioUrl("");
      } else if (affirmationInfo.name) {
        setAffirmation("");
      }
      messageStore.setMessage("affirmation name updated successfully ", 200);
    } catch (error) {
      messageStore.setMessage("Failed to update affirmation name ", 500);
    }
  };
  const onAudioChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAffirmationStatus((prev) => ({ ...prev, file: "" }));
      setAudio(event.target.files[0]);
    }
  };

  const addImage = async () => {
    try {
      if (!image) {
        throw new Error("Image not found");
      }
      if (!image.type.includes("image")) {
        throw new Error("you have to upload an image ");
      }
      const downloadURL = await addFileApi(
        userStore.user.uid,
        image,
        folderNames.IMAGES
      );

      console.log({ downloadURL });
      await updateAffirmation({
        imageUrl: downloadURL,
      });

      setImage(null);

      messageStore.setMessage("Image added successfully", 200);
    } catch (error) {
      console.log(error);
      messageStore.setMessage(error.message, 500);
    } finally {
      setImage(null);
    }
  };
  const addAudio = async () => {
    try {
      if (!audio) {
        throw new Error("You have to  choose file first");
      }
      if (!audio.type.includes("audio")) {
        throw new Error("you have to choose an audio file");
      }
      const downloadURL = await addFileApi(
        userStore.user.uid,
        audio,
        folderNames.AUDIOS
      );
      await updateAffirmation({
        audioUrl: downloadURL,
      });

      messageStore.setMessage("audio added successfully", 200);
    } catch (error) {
      messageStore.setMessage(error.message, 500);
    } finally {
      setAudio(null);
    }
  };

  return (
    <div className="p-6 gap-5 rounded-xl w-[90vw] h-[85vh] flex flex-col items-center bg-white text-lg font-bold shadow-md">
      <div className="flex flex-col gap-4 w-[90%] items-center md:w-[50%] p-4 md:p-5">
        {/* Affirmation Input */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <div className="flex flex-col">
              <input
                dir="rtl"
                ref={inputRef}
                type="text"
                value={affirmation}
                onChange={(e) => {
                  setAffirmationStatus((prev) => ({ ...prev, text: "" }));
                  setAffirmation(e.target.value);
                  setIsAffirmationChanged(true);
                }}
                placeholder="Type your short suggestion"
                className=" border-gray-300 rounded-md w-full h-12 px-2 border-2"
              />
              <div className="text-gray-700">
                {affirmationsStore.affirmation?.name}
              </div>
            </div>
            <SettingsButton
              onClick={() => updateAffirmation({ name: affirmation })}
              isDisabled={!isAffirmationChanged || affirmation.length === 0}
            >
              Update Affirmation
            </SettingsButton>
          </div>
          <SettingsAlert
            text={affirmationStatus.text}
            txtColor={txtColor.text}
          />
        </div>

        {/* Image Selection */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <BasicSelect
              className="w-full md:w-36"
              handleChange={setImageUrl}
              value={imageUrl}
              options={imageItemOptions}
              name="Image Select"
            />
            <SettingsButton
              onClick={() => updateAffirmation({ imageUrl })}
              isDisabled={!imageUrl}
            >
              Update Image
            </SettingsButton>
          </div>
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <input
              type="file"
              onChange={onImageChange}
              className=" border-gray-300 rounded-md w-full h-12 px-2"
            />
            <SettingsButton isDisabled={!image} onClick={addImage}>
              Upload Image
            </SettingsButton>
            {imageUrl && (
              <Image
                width={200}
                height={200}
                className="rounded-lg"
                alt="preview image"
                src={image ? URL.createObjectURL(image) : imageUrl}
              />
            )}
          </div>
          <SettingsAlert
            text={affirmationStatus.image}
            txtColor={txtColor.image}
          />
        </div>

        {/* Audio Selection */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <BasicSelect
              className="w-full md:w-36"
              handleChange={setAudioUrl}
              value={audioUrl}
              options={audioItemOptions}
              name="Audio Select"
            />
            <SettingsButton
              onClick={() => updateAffirmation({ audioUrl })}
              isDisabled={!audioUrl}
            >
              Update Audio
            </SettingsButton>
          </div>
          <div className="flex gap-2 items-center flex-col w-full md:flex-row">
            <input
              type="file"
              onChange={onAudioChange}
              className=" border-gray-300 rounded-md w-full h-12 px-2"
            />
            <SettingsButton isDisabled={!audio} onClick={addAudio}>
              Upload Audio
            </SettingsButton>
          </div>
        </div>
      </div>
    </div>
  );
}
export default observer(Settings);

function SettingsAlert({ txtColor, text }) {
  return <div className={`h-5 w-full ${txtColor}`}>{text}</div>;
}
