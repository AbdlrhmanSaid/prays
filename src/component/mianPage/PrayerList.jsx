import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import Prayer from "../../layouts/Prayer";
import { useDispatch } from "react-redux";
import { setIncompletePrayers } from "../../store/slices/nextPrayerSlice"; // Adjust the import path accordingly

import fjr from "../../assets/fajr-prayer.png";
import dhr from "../../assets/dhhr-prayer-mosque.png";
import asr from "../../assets/asr-prayer-mosque.png";
import mghrb from "../../assets/sunset-prayer-mosque.png";
import isha from "../../assets/night-prayer-mosque.png";

const convertTo12Hour = (time24) => {
  if (!time24) return "اختر المحافظة";
  const [hours, minutes] = time24.split(":");
  let hour = parseInt(hours, 10);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minutes} ${period}`;
};

const isPrayerTimePassed = (prayerTime) => {
  if (!prayerTime) return false;

  const [prayerHour, prayerMinute, prayerPeriod] = prayerTime.split(/[:\s]/);
  let prayerHour24 = parseInt(prayerHour, 10);
  if (prayerPeriod === "PM" && prayerHour24 !== 12) {
    prayerHour24 += 12;
  }
  if (prayerPeriod === "AM" && prayerHour24 === 12) {
    prayerHour24 = 0;
  }

  const prayerDate = new Date();
  prayerDate.setHours(prayerHour24, parseInt(prayerMinute, 10), 0, 0);

  const currentDate = new Date();

  return currentDate > prayerDate;
};

const PrayerList = ({ pray }) => {
  const dispatch = useDispatch();

  const prayers = [
    { name: "الفجر", time: convertTo12Hour(pray.Fajr), img: fjr },
    { name: "الضهر", time: convertTo12Hour(pray.Dhuhr), img: dhr },
    { name: "العصر", time: convertTo12Hour(pray.Asr), img: asr },
    { name: "المغرب", time: convertTo12Hour(pray.Maghrib), img: mghrb },
    { name: "العشاء", time: convertTo12Hour(pray.Isha), img: isha },
  ];

  useEffect(() => {
    const incompletePrayers = prayers
      .filter((prayer) => !isPrayerTimePassed(prayer.time))
      .map((prayer) => ({ name: prayer.name, time: prayer.time }));
    dispatch(setIncompletePrayers(incompletePrayers));
  }, [prayers, dispatch]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
      className="gap-3 my-4"
    >
      {prayers.map((prayer, index) => (
        <Prayer
          key={index}
          name={prayer.name}
          time={prayer.time}
          imge={prayer.img}
          isDone={isPrayerTimePassed(prayer.time)}
        />
      ))}
    </Stack>
  );
};

export default PrayerList;
