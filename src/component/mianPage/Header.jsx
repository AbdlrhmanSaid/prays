import { Grid } from "@mui/material";
import useHeadInfo from "../../hooks/useHeadInfo";
import { useSelector } from "react-redux";

const HeaderPage = ({ governorate }) => {
  const { time, nextPrayerName, remainingTime, date } = useHeadInfo();
  const { isEnglish } = useSelector((state) => state.lang);

  return (
    <Grid container textAlign={"center"} className="text-white mt-4">
      <Grid item xs={12} sm={6} md={6}>
        <div>
          <h2>
            <span>{time}</span> |{" "}
            <span>
              {governorate || (isEnglish ? "choose City" : "اختر المدينة")}
            </span>
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
