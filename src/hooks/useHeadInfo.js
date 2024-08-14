import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
      isEnglish
        ? setTime(
            now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          )
        : setTime(
            now.toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          );

      if (incompletePrayers.length > 0 && incompletePrayers[0].time) {
        try {
          const prayerTimeStr = incompletePrayers[0].time; // Expected format: "HH:MM AM/PM"
          const [timePart, period] = prayerTimeStr.split(" ");
          const [hours, minutes] = timePart.split(":").map(Number);

          const nowDate = new Date();
          const prayerDate = new Date();

          let hours24 = hours;
          if (period === "PM" && hours !== 12) {
            hours24 += 12;
          } else if (period === "AM" && hours === 12) {
            hours24 = 0;
          }

          prayerDate.setHours(hours24, minutes, 0, 0);

          const timeDifference = prayerDate - nowDate;
          if (timeDifference > 0) {
            const hoursDifference = Math.floor(
              timeDifference / (1000 * 60 * 60)
            );
            const minutesDifference = Math.floor(
              (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const secondsDifference = Math.floor(
              (timeDifference % (1000 * 60)) / 1000
            );

            setRemainingTime(
              `${`${hoursDifference} :`}${minutesDifference} :${secondsDifference} `
            );
          } else {
            setRemainingTime(isEnglish ? "Choose City" : `اختر المدينه`);
          }
        } catch (error) {
          setRemainingTime("خطأ في بيانات الوقت");
        }
      } else {
        setRemainingTime(
          isEnglish ? "All prayer have been completed" : "تم انتهاء فروض الصلاه"
        );
      }
    };

    const updateDate = () => {
      const today = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      isEnglish
        ? setDate(today.toLocaleDateString("en-US", options))
        : setDate(today.toLocaleDateString("ar-EG", options));
    };

    updateTime();
    updateDate();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [incompletePrayers]);

  return { time, nextPrayerName, remainingTime, date };
};

export default useHeadInfo;
