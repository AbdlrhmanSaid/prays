import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

// ─── Single Dhikr Card with Counter ─────────────────────────────────────────
const DhikrCard = ({ mainText, subText, requiredCount }) => {
  const [count, setCount] = useState(0);
  const done = count >= requiredCount;

  const handleTap = () => {
    if (!done) setCount((c) => c + 1);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setCount(0);
  };

  return (
    <Box
      onClick={handleTap}
      sx={{
        background: done
          ? "rgba(212, 175, 55, 0.08)"
          : "rgba(255, 255, 255, 0.03)",
        border: `1px solid ${done ? "#d4af37" : "rgba(212, 175, 55, 0.15)"}`,
        borderRadius: "20px",
        padding: "24px",
        cursor: done ? "default" : "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        userSelect: "none",
        "&:hover": {
          background: done
            ? "rgba(212, 175, 55, 0.12)"
            : "rgba(255, 255, 255, 0.06)",
          borderColor: "rgba(212, 175, 55, 0.4)",
          transform: done ? "none" : "translateY(-3px)",
          boxShadow: done ? "none" : "0 8px 25px rgba(0,0,0,0.2)",
        },
        "&:active": {
          transform: done ? "none" : "scale(0.99)",
        },
      }}
    >
      {/* Counter Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: done ? "#d4af37" : "rgba(212, 175, 55, 0.15)",
            border: `2px solid ${done ? "#d4af37" : "rgba(212,175,55,0.3)"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: done ? "0 0 15px rgba(212,175,55,0.5)" : "none",
          }}
        >
          <Typography
            sx={{
              color: done ? "#0a192f" : "#d4af37",
              fontSize: "16px",
              fontWeight: 900,
              lineHeight: 1,
              transition: "all 0.3s ease",
            }}
          >
            {count}
          </Typography>
          <Typography
            sx={{
              color: done ? "#0a192f" : "rgba(212,175,55,0.6)",
              fontSize: "9px",
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            / {requiredCount}
          </Typography>
        </Box>

        {count > 0 && (
          <Box
            onClick={handleReset}
            sx={{
              color: "rgba(212,175,55,0.5)",
              fontSize: "11px",
              cursor: "pointer",
              "&:hover": { color: "#d4af37" },
              padding: "2px 6px",
              borderRadius: "4px",
              transition: "color 0.2s",
            }}
          >
            ↺
          </Box>
        )}
      </Box>

      {/* Done checkmark */}
      {done && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#d4af37",
            fontSize: "22px",
          }}
        >
          ✓
        </Box>
      )}

      {/* Main dhikr text */}
      <Typography
        sx={{
          color: done ? "rgba(255,255,255,0.5)" : "#fff",
          lineHeight: "2",
          fontSize: { xs: "17px", md: "19px" },
          textAlign: "right",
          fontWeight: 500,
          pl: { xs: 0, sm: 8 },
          transition: "color 0.3s ease",
        }}
      >
        {mainText}
      </Typography>

      {/* Sub text (virtue) */}
      {subText && (
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px dashed rgba(212, 175, 55, 0.2)",
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            flexDirection: "row-reverse",
          }}
        >
          <Box sx={{ color: "#d4af37", fontSize: "18px", mt: 0.3 }}> </Box>
          <Typography
            sx={{
              color: "rgba(212, 175, 55, 0.85)",
              fontSize: "14px",
              lineHeight: "1.7",
              fontWeight: 600,
              fontStyle: "italic",
              textAlign: "right",
              width: "100%",
            }}
          >
            {subText}
          </Typography>
        </Box>
      )}

      {/* Tap hint */}
      {!done && (
        <Typography
          sx={{
            color: "rgba(212,175,55,0.35)",
            fontSize: "12px",
            textAlign: "center",
            mt: 1.5,
            fontWeight: 600,
          }}
        >
          اضغط للعد
        </Typography>
      )}
    </Box>
  );
};

// ─── Parse count from category name ─────────────────────────────────────────
const parseRequiredCount = (category) => {
  if (!category) return 1;
  const map = {
    "مره واحده": 1,
    "مرة واحدة": 1,
    واحده: 1,
    "ثلاث مرات": 3,
    "ثلاثة مرات": 3,
    ثلاث: 3,
    "أربع مرات": 4,
    "أربعة مرات": 4,
    أربع: 4,
    "سبع مرات": 7,
    سبع: 7,
    "عشر مرات": 10,
    عشر: 10,
    "مئة مرات": 100,
    مئة: 100,
    "مئة مره": 100,
  };
  for (const [key, val] of Object.entries(map)) {
    if (category.includes(key)) return val;
  }
  return 1;
};

// ─── Azkar Layout ────────────────────────────────────────────────────────────
const Azkar = ({ azkar, title }) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        padding: { xs: "30px 15px", md: "40px 30px" },
        marginTop: "10px",
        marginBottom: "60px",
      }}
    >
      {/* Page Title */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          sx={{
            color: "#d4af37",
            fontWeight: "900",
            fontSize: { xs: "32px", md: "48px" },
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            mb: 1.5,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            height: "3px",
            width: "80px",
            background: "#d4af37",
            margin: "0 auto",
            borderRadius: "2px",
          }}
        />
      </Box>

      {/* Categories */}
      <div className="azkar-container">
        {azkar.map((category, catIndex) => {
          const requiredCount = parseRequiredCount(category.category);
          return (
            <Box key={catIndex} sx={{ mb: 6 }}>
              {/* Category header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  flexDirection: "row-reverse",
                }}
              >
                <Box
                  sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#d4af37",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(212,175,55,0.6)",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    color: "#d4af37",
                    fontWeight: "800",
                    fontSize: "22px",
                  }}
                >
                  {category.category}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: "1px",
                    background: "rgba(212, 175, 55, 0.2)",
                  }}
                />
              </Box>

              {/* Dhikr cards */}
              <Box sx={{ display: "grid", gap: 2.5 }}>
                {category.text.map((textItem, textIndex) => {
                  const mainText = Array.isArray(textItem)
                    ? textItem[0]
                    : textItem;
                  const subText = Array.isArray(textItem) ? textItem[1] : null;

                  return (
                    <DhikrCard
                      key={textIndex}
                      mainText={mainText}
                      subText={subText}
                      requiredCount={requiredCount}
                    />
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </div>
    </Container>
  );
};

export default Azkar;
