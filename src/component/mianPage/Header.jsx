import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const HeaderPage = ({ governorate }) => {
  const incompletePrayers = useSelector(
    (state) => state.nextPray.incompletePrayers
  );
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  const nextPrayerName =
    incompletePrayers.length > 0
      ? `متبقي حتى صلاة ${incompletePrayers[0].name}`
      : "اختر المحافظة";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );

      // حساب الوقت المتبقي
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
            setRemainingTime("اختر المدينه");
          }
        } catch (error) {
          console.error("Error processing prayer time:", error);
          setRemainingTime("خطأ في بيانات الوقت");
        }
      } else {
        setRemainingTime("بيانات الصلاة غير متوفرة");
      }
    };

    const updateDate = () => {
      const today = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      setDate(today.toLocaleDateString("ar-EG", options));
    };

    updateTime();
    updateDate();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [incompletePrayers]);

  return (
    <Grid container textAlign={"center"} className="text-white mt-4">
      <Grid item xs={12} sm={6} md={6}>
        <div>
          <h2>
            <span>{time}</span> | <span>{governorate || "اختر المحافظة"}</span>
          </h2>
          <span>{date}</span>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <h2>{nextPrayerName}</h2>
        <h2>{remainingTime}</h2>
      </Grid>
    </Grid>
  );
};

export default HeaderPage;
