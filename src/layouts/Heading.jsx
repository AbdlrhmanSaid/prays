import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Heading = ({ title }) => {
  const { isEnglish } = useSelector((state) => state.lang);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: "18px 0",
        marginBottom: "16px",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexDirection: "row-reverse",
            justifyContent: "center",
          }}
        >
          {/* Home button */}
          <Button
            onClick={() => navigate("/")}
            startIcon={isEnglish ? <HomeIcon /> : null}
            endIcon={!isEnglish ? <HomeIcon /> : null}
            sx={{
              color: "rgba(255,255,255,0.55)",
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "none",
              minWidth: "auto",
              padding: "6px 14px",
              borderRadius: "8px",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#c9a227",
                background: "rgba(201,162,39,0.08)",
              },
              gap: 1,
            }}
          >
            {isEnglish ? "Home" : "الرئيسية"}
          </Button>

          {/* Separator */}
          <ArrowForwardIosIcon
            sx={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "12px",
              transform: isEnglish ? "none" : "rotate(180deg)",
            }}
          />

          {/* Current page */}
          <Typography
            sx={{
              color: "#c9a227",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Heading;
