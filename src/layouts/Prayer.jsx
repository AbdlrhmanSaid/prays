import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LightModeIcon from "@mui/icons-material/LightMode";
import CloudIcon from "@mui/icons-material/Cloud";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";

// Fixed accent color per prayer (no gradient)
const PRAYER_COLORS = {
  الفجر:   "#e8a598",
  الشروق:  "#f0c070",
  الظهر:   "#c9a227",
  العصر:   "#6fb08a",
  المغرب:  "#e09060",
  العشاء:  "#8888cc",
  Fajr:    "#e8a598",
  Sunrise: "#f0c070",
  Dhuhr:   "#c9a227",
  Asr:     "#6fb08a",
  Maghrib: "#e09060",
  Isha:    "#8888cc",
};

const PRAYER_ICONS = {
  الفجر:   <WbTwilightIcon sx={{ fontSize: 40 }} />,
  الشروق:  <WbSunnyIcon   sx={{ fontSize: 40 }} />,
  الظهر:   <LightModeIcon  sx={{ fontSize: 40 }} />,
  العصر:   <CloudIcon      sx={{ fontSize: 40 }} />,
  المغرب:  <DarkModeIcon   sx={{ fontSize: 40 }} />,
  العشاء:  <BedtimeIcon    sx={{ fontSize: 40 }} />,
  Fajr:    <WbTwilightIcon sx={{ fontSize: 40 }} />,
  Sunrise: <WbSunnyIcon    sx={{ fontSize: 40 }} />,
  Dhuhr:   <LightModeIcon  sx={{ fontSize: 40 }} />,
  Asr:     <CloudIcon       sx={{ fontSize: 40 }} />,
  Maghrib: <DarkModeIcon    sx={{ fontSize: 40 }} />,
  Isha:    <BedtimeIcon     sx={{ fontSize: 40 }} />,
};

const Prayer = ({ name, time, isDone }) => {
  const loading = useSelector((state) => state.loading);
  const { isEnglish } = useSelector((state) => state.lang);

  const color = PRAYER_COLORS[name] || "#c9a227";
  const icon  = PRAYER_ICONS[name]  || <WbSunnyIcon sx={{ fontSize: 40 }} />;

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: "200px", md: "170px" },
        background: isDone
          ? "rgba(255, 255, 255, 0.02)"
          : "rgba(255, 255, 255, 0.05)",
        border: `1.5px solid ${isDone ? "rgba(255,255,255,0.07)" : color + "55"}`,
        borderRadius: "22px",
        padding: "28px 18px",
        textAlign: "center",
        transition: "all 0.35s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: isDone ? 0.6 : 1,
        "&:hover": {
          transform: isDone ? "none" : "translateY(-8px)",
          borderColor: isDone ? "rgba(255,255,255,0.12)" : color,
          boxShadow: isDone ? "none" : `0 16px 36px ${color}20`,
          "& .prayer-icon": {
            transform: "scale(1.15)",
          },
        },
      }}
    >
      {loading ? (
        <CircularProgress sx={{ color }} size={38} />
      ) : (
        <>
          <Box
            className="prayer-icon"
            sx={{
              color,
              mb: 1.5,
              transition: "transform 0.35s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "52px",
            }}
          >
            {icon}
          </Box>

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "1px",
              mb: 0.5,
            }}
          >
            {name}
          </Typography>

          <Typography
            sx={{
              color: isDone ? "rgba(255,255,255,0.4)" : "#fff",
              fontSize: "28px",
              fontWeight: "900",
              letterSpacing: "0.5px",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {time}
          </Typography>

          {isDone && (
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                color: "#5cb85c",
                background: "rgba(92,184,92,0.1)",
                padding: "3px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>{isEnglish ? "PASSED" : "انتهت"}</span>
            </Box>
          )}

          {/* Color accent dot */}
          {!isDone && (
            <Box
              sx={{
                position: "absolute",
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 8px ${color}`,
                opacity: 0.7,
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Prayer;
