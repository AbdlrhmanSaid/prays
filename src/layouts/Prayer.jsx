import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LightModeIcon from '@mui/icons-material/LightMode';
import CloudIcon from '@mui/icons-material/Cloud';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';

const Prayer = ({ name, time, isDone }) => {
  const loading = useSelector((state) => state.loading);
  const { isEnglish } = useSelector((state) => state.lang);

  const prayerIcons = {
    الفجر: <WbTwilightIcon sx={{ fontSize: 45 }} />,
    الشروق: <WbSunnyIcon sx={{ fontSize: 45 }} />,
    الظهر: <LightModeIcon sx={{ fontSize: 45 }} />,
    العصر: <CloudIcon sx={{ fontSize: 45 }} />,
    المغرب: <DarkModeIcon sx={{ fontSize: 45 }} />,
    العشاء: <BedtimeIcon sx={{ fontSize: 45 }} />,
    Fajr: <WbTwilightIcon sx={{ fontSize: 45 }} />,
    Sunrise: <WbSunnyIcon sx={{ fontSize: 45 }} />,
    Dhuhr: <LightModeIcon sx={{ fontSize: 45 }} />,
    Asr: <CloudIcon sx={{ fontSize: 45 }} />,
    Maghrib: <DarkModeIcon sx={{ fontSize: 45 }} />,
    Isha: <BedtimeIcon sx={{ fontSize: 45 }} />,
  };

  const prayerColors = {
    الفجر: "#FF9A8B",
    الشروق: "#FFD080",
    الظهر: "#FFF380",
    العصر: "#80FFB7",
    المغرب: "#FFB080",
    العشاء: "#A0A0FF",
    Fajr: "#FF9A8B",
    Sunrise: "#FFD080",
    Dhuhr: "#FFF380",
    Asr: "#80FFB7",
    Maghrib: "#FFB080",
    Isha: "#A0A0FF",
  };

  const color = prayerColors[name] || "#d4af37";
  const icon = prayerIcons[name] || <WbSunnyIcon sx={{ fontSize: 45 }} />;

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: "240px", md: "180px" },
        background: isDone 
          ? "rgba(255, 255, 255, 0.03)" 
          : `linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)`,
        backdropFilter: "blur(12px)",
        border: `2px solid ${isDone ? "rgba(255, 255, 255, 0.1)" : color + "60"}`,
        borderRadius: "24px",
        padding: "30px 20px",
        textAlign: "center",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: isDone ? 0.7 : 1,
        boxShadow: isDone ? "none" : `0 10px 30px ${color}15`,
        "&:hover": {
          transform: isDone ? "none" : "translateY(-10px)",
          borderColor: isDone ? "rgba(255, 255, 255, 0.2)" : color,
          boxShadow: isDone ? "0 5px 15px rgba(0,0,0,0.2)" : `0 20px 40px ${color}30`,
          "& .prayer-icon": {
            transform: "scale(1.2) rotate(5deg)",
          }
        }
      }}
    >
      {loading ? (
        <CircularProgress sx={{ color: color }} size={40} />
      ) : (
        <>
          <Box
            className="prayer-icon"
            sx={{
              color: color,
              mb: 2,
              transition: "transform 0.4s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60px"
            }}
          >
            {icon}
          </Box>

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "15px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              mb: 0.5
            }}
          >
            {name}
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontSize: "32px",
              fontWeight: "900",
              letterSpacing: "1px"
            }}
          >
            {time}
          </Typography>

          {isDone && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#4CAF50",
                background: "rgba(76, 175, 80, 0.1)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "800"
              }}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>{isEnglish ? "PASSED" : "انتهت"}</span>
            </Box>
          )}

          {/* Decorative element */}
          {!isDone && (
            <Box
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 60,
                height: 60,
                background: color,
                opacity: 0.1,
                borderRadius: "50%",
                filter: "blur(15px)"
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Prayer;
