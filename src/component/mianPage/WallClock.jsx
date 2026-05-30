import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

const WallClock = ({ governorate }) => {
  const { isEnglish } = useSelector((state) => state.lang);
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now);
      setDate(format(now, "PP", { locale: isEnglish ? enUS : ar }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isEnglish]);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const secondDeg = (seconds / 60) * 360;

  const digitalTime = format(time, "hh:mm:ss a", {
    locale: isEnglish ? enUS : ar,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 3, md: 6 },
        mb: 5,
        mt: 1,
      }}
    >
      {/* Analog Clock */}
      <Box
        sx={{
          position: "relative",
          width: { xs: 200, md: 240 },
          height: { xs: 200, md: 240 },
          flexShrink: 0,
        }}
      >
        {/* Outer ring glow */}
        <Box
          sx={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            background: "transparent",
            boxShadow:
              "0 0 30px rgba(212, 175, 55, 0.25), 0 0 60px rgba(212, 175, 55, 0.1)",
          }}
        />
        {/* Clock face */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #1a2e4a, #0a1929)",
            border: "3px solid #d4af37",
            position: "relative",
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.5), 0 10px 40px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 360;
            const isMajor = i % 3 === 0;
            return (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: isMajor ? "3px" : "2px",
                  height: isMajor ? "14px" : "9px",
                  background: isMajor ? "#d4af37" : "rgba(212,175,55,0.5)",
                  borderRadius: "2px",
                  transformOrigin: "50% 0",
                  transform: `translateX(-50%) translateY(calc(-50% - ${isMajor ? 88 : 90}px)) rotate(${angle}deg)`,
                }}
              />
            );
          })}

          {/* Hour hand */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              width: "5px",
              height: "60px",
              background: "linear-gradient(to top, #d4af37, #fff8e1)",
              borderRadius: "3px 3px 0 0",
              transformOrigin: "50% 100%",
              transform: `translateX(-50%) rotate(${hourDeg}deg)`,
              transition: "transform 0.5s ease",
              boxShadow: "0 0 8px rgba(212,175,55,0.5)",
            }}
          />

          {/* Minute hand */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              width: "3px",
              height: "80px",
              background: "linear-gradient(to top, #d4af37, #ffffff)",
              borderRadius: "2px 2px 0 0",
              transformOrigin: "50% 100%",
              transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
              transition: "transform 0.5s ease",
            }}
          />

          {/* Second hand */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              width: "2px",
              height: "88px",
              background: "#e74c3c",
              borderRadius: "1px 1px 0 0",
              transformOrigin: "50% 100%",
              transform: `translateX(-50%) rotate(${secondDeg}deg)`,
              transition: "transform 0.15s cubic-bezier(0.4,2.08,0.55,0.44)",
              boxShadow: "0 0 6px rgba(231,76,60,0.8)",
            }}
          />

          {/* Center dot */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 12,
              height: 12,
              background: "#d4af37",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              boxShadow: "0 0 10px rgba(212,175,55,0.8)",
            }}
          />
        </Box>
      </Box>

      {/* Digital Info */}
      <Box
        sx={{
          textAlign: { xs: "center", md: isEnglish ? "left" : "right" },
        }}
      >
        <Typography
          sx={{
            color: "#d4af37",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            mb: 1,
            opacity: 0.8,
          }}
        >
          {isEnglish ? "Current Time" : "الوقت الحالي"}
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: "40px", md: "52px" },
            fontWeight: 900,
            fontFamily: "monospace",
            lineHeight: 1,
            letterSpacing: "2px",
            textShadow: "0 0 20px rgba(255,255,255,0.1)",
            mb: 1,
          }}
        >
          {format(time, "hh:mm")}
          <span
            style={{
              color: "#d4af37",
              fontSize: "60%",
              marginInlineStart: "8px",
            }}
          >
            {format(time, "ss")}
          </span>
        </Typography>

        <Typography
          sx={{
            color: "#d4af37",
            fontSize: "20px",
            fontWeight: 700,
            mb: 1,
          }}
        >
          {format(time, "a", { locale: isEnglish ? enUS : ar })}
        </Typography>

        <Box
          sx={{
            width: "60px",
            height: "2px",
            background: "#d4af37",
            borderRadius: "2px",
            mb: 1.5,
            mx: { xs: "auto", md: isEnglish ? 0 : "auto" },
          }}
        />

        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          {date}
        </Typography>

        {governorate && (
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
              fontWeight: 500,
              mt: 0.5,
            }}
          >
            {governorate}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default WallClock;
