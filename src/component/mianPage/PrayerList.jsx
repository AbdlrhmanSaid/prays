import { Stack } from "@mui/material";
import Prayer from "../../layouts/Prayer";
import usePrayerList from "../../hooks/usePrayerList.js";
import { useSelector } from "react-redux";

const PrayerList = () => {
  const { prayers, isPrayerTimePassed } = usePrayerList();
  const { isEnglish } = useSelector((state) => state.lang);

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
          name={isEnglish ? prayer.name[1] : prayer.name[0]}
          time={prayer.time}
          imge={prayer.img}
          isDone={isPrayerTimePassed(prayer.time)}
        />
      ))}
    </Stack>
  );
};

export default PrayerList;
