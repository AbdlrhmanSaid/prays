import { Grid, Box, Typography, Divider } from "@mui/material";
import useHeadInfo from "../../hooks/useHeadInfo";
import { useSelector } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';

const HeaderPage = ({ governorate }) => {
  const { time, nextPrayerName, remainingTime, date } = useHeadInfo();
  const { isEnglish } = useSelector((state) => state.lang);

  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(212, 175, 55, 0.2)",
        borderRadius: "30px",
        padding: { xs: "30px 20px", md: "40px 50px" },
        marginBottom: "40px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #d4af37, #3ab4d4, #d4af37)",
        }
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
          <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, gap: 1, mb: 1, flexDirection: isEnglish ? "row" : "row-reverse" }}>
              <AccessTimeIcon sx={{ color: "#d4af37", fontSize: "20px" }} />
              <Typography
                sx={{
                  color: "#d4af37",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {isEnglish ? "Current Time" : "الوقت الحالي"}
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontSize: { xs: "36px", sm: "48px", md: "56px" },
                fontWeight: 900,
                lineHeight: 1,
                mb: 1
              }}
            >
              {time}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "18px",
                  fontWeight: 600
                }}
              >
                {governorate || (isEnglish ? "Choose City" : "اختر المدينة")}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "14px",
                  fontWeight: 500
                }}
              >
                {date}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={2} sx={{ display: { xs: "none", md: "block" } }}>
          <Divider orientation="vertical" flexItem sx={{ height: "80px", borderColor: "rgba(212, 175, 55, 0.2)", margin: "0 auto" }} />
        </Grid>

        <Grid item xs={12} md={5}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
             <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-end" }, gap: 1, mb: 1, flexDirection: isEnglish ? "row" : "row-reverse" }}>
              <TimerIcon sx={{ color: "#3ab4d4", fontSize: "20px" }} />
              <Typography
                sx={{
                  color: "#3ab4d4",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {isEnglish ? "Next Prayer" : "الصلاة القادمة"}
              </Typography>
            </Box>
            
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "24px", md: "30px" },
                fontWeight: 800,
                mb: 0.5
              }}
            >
              {isEnglish ? "Remaining for " : "متبقي على صلاة "} 
              <span style={{ color: "#3ab4d4" }}>{nextPrayerName}</span>
            </Typography>
            
            <Typography
              sx={{
                color: "#3ab4d4",
                fontSize: { xs: "32px", md: "42px" },
                fontWeight: 900,
                fontFamily: "monospace",
                letterSpacing: "2px",
                textShadow: "0 0 20px rgba(58, 180, 212, 0.4)"
              }}
            >
              {remainingTime}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderPage;
