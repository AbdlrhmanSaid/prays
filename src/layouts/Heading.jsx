import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Heading = ({ title }) => {
  const { isEnglish } = useSelector((state) => state.lang);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: "20px 0",
        marginBottom: "20px",
        textAlign: "center",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "15px",
            background: "rgba(255, 255, 255, 0.05)",
            padding: "8px 24px",
            borderRadius: "50px",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            startIcon={isEnglish ? <ArrowBackIcon /> : null}
            endIcon={!isEnglish ? <ArrowBackIcon sx={{ transform: 'rotate(180deg)' }} /> : null}
            sx={{
              color: "#d4af37",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              minWidth: "auto",
              padding: "4px 12px",
              "&:hover": {
                background: "rgba(212, 175, 55, 0.1)",
              },
            }}
          >
            {isEnglish ? "Home" : "الرئيسية"}
          </Button>

          <Box sx={{ width: "1px", height: "20px", background: "rgba(212, 175, 55, 0.3)" }} />

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "14px",
              fontWeight: 600,
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
