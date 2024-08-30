import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { ar, enUS } from "date-fns/locale";

const useHeadInfo = () => {
  const incompletePrayers = useSelector(
    (state) => state.nextPray.incompletePrayers
  );
  const { isEnglish } = useSelector((state) => state.lang);

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  const nextPrayerName =
    incompletePrayers.length > 0
      ? isEnglish
        ? `Time remaining until prayer ${incompletePrayers[0].name[1]}`
        : `متبقي حتى صلاة ${incompletePrayers[0].name[0]}`
      : isEnglish
      ? "Choose City"
      : "اختر المدينة";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(format(now, "hh:mm a", { locale: isEnglish ? enUS : ar }));

      if (incompletePrayers.length > 0 && incompletePrayers[0].time) {
        const prayerTimeStr = incompletePrayers[0].time;
        const [timePart, period] = prayerTimeStr.split(" ");
        const [hours, minutes] = timePart.split(":").map(Number);

        let prayerDate = new Date();
        prayerDate.setHours(
          hours + (period === "PM" && hours !== 12 ? 12 : 0),
          minutes,
          0
        );

        const timeDifference = prayerDate.getTime() - now.getTime();

        if (timeDifference > 0) {
          const hoursDifference = differenceInHours(prayerDate, now);
          const minutesDifference = differenceInMinutes(prayerDate, now) % 60;
          const secondsDifference = differenceInSeconds(prayerDate, now) % 60;

          setRemainingTime(
            `${hoursDifference} : ${minutesDifference} : ${secondsDifference}`
          );
        } else {
          setRemainingTime(isEnglish ? "Choose City" : "اختر المدينه");
        }
      } else {
        setRemainingTime(
          isEnglish
            ? "All prayers have been completed"
            : "تم انتهاء فروض الصلاه"
        );
      }
    };

    const updateDate = () => {
      const today = new Date();
      setDate(format(today, "PP", { locale: isEnglish ? enUS : ar }));
    };

    updateTime();
    updateDate();

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [incompletePrayers, isEnglish]);

  return { time, nextPrayerName, remainingTime, date };
};

export default useHeadInfo;
