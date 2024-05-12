import { makeAutoObservable } from "mobx";
import React, { useState, useEffect } from "react";
import { Howl } from "howler";

let timesInterval: any = null;
class Audio {
  sound: any = null;
  time: number = 0;

  constructor() {
    makeAutoObservable(this);
  }
  startTime() {
    timesInterval = setInterval(() => {
      this.time += 1;
    }, 1000);
  }

  stopTime() {
    clearInterval(timesInterval);
  }
  setTime(newTime: number) {
    this.time = newTime;
  }

  setSound = (initialFileName: string) => {
    this.sound = new Howl({
      src: [initialFileName],
      loop: true,
    });
  };

  playSound = () => {
    this.sound.play();
  };

  stopSound = () => {
    this.sound.stop();
  };
  pauseSound = () => {
    this.sound.pause();
  };
}
export const AudioStore = new Audio();
