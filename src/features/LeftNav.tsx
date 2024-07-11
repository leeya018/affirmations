import React from "react";
import { HiOutlineHome } from "react-icons/hi";
import { BsGraphUpArrow } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";

import { observer } from "mobx-react-lite";
import navStore from "@/mobx/navStore";
import { navNames } from "@/util";

const LeftNav = observer(() => {
  const { setSelectedName, selectedName } = navStore;

  // console.log("selectedName", selectedName);
  return (
    <div
      className=" shadow-md  flex  justify-between bg-white  gap-2  p-3 items-center  h-16 w-full
         md:flex-col md:justify-start  md:h-[85vh] md:w-16
     rounded-xl md:mr-2"
    >
      {/*  */}

      <HiOutlineHome
        name={navNames.home}
        onClick={() => {
          setSelectedName(navNames.home);
        }}
        size={40}
        className={` ${
          selectedName === navNames.home
            ? "text-blue bg-gray-300 bg-opacity-50"
            : ""
        } p-2 rounded-md cursor-pointer`}
      />
      <BsGraphUpArrow
        name={navNames.insights}
        onClick={() => {
          setSelectedName(navNames.insights);
        }}
        size={40}
        className={`${
          selectedName === navNames.insights
            ? "text-blue bg-gray-300 bg-opacity-50"
            : ""
        } p-2 rounded-md cursor-pointer `}
      />
      <SlCalender
        name={navNames.calender}
        onClick={() => {
          setSelectedName(navNames.calender);
        }}
        size={40}
        className={`${
          selectedName === navNames.calender
            ? "text-blue bg-gray-300 bg-opacity-50"
            : ""
        } p-2 rounded-md cursor-pointer `}
      />
      <IoSettingsOutline
        name={navNames.settings}
        onClick={() => {
          setSelectedName(navNames.settings);
        }}
        size={40}
        className={`${
          selectedName === navNames.settings
            ? "text-blue bg-gray-300 bg-opacity-50"
            : ""
        } p-2 rounded-md cursor-pointer `}
      />
    </div>
  );
});
export default LeftNav;
