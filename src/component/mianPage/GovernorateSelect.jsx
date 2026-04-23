import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const GovernorateSelect = ({
  governorate,
  handleChange,
  governorates,
  loading,
  error,
}) => {
  const { isEnglish } = useSelector((state) => state.lang);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (govName) => {
    handleChange({ target: { value: govName } });
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "90%",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Box
        onClick={() => !loading && !error && setIsOpen(!isOpen)}
        sx={{
          background:
            "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(55, 180, 212, 0.15) 100%)",
          border: "2.5px solid #d4af37",
          borderRadius: "15px",
          padding: "16px 22px",
          cursor: loading || error ? "not-allowed" : "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "all 0.3s ease",
          backgroundColor: isOpen
            ? "rgba(212, 175, 55, 0.22)"
            : "rgba(212, 175, 55, 0.12)",
          boxShadow: isOpen
            ? "0 0 25px rgba(212, 175, 55, 0.4)"
            : "0 8px 20px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "rgba(212, 175, 55, 0.18)",
            borderColor: "#e8c547",
            boxShadow: "0 0 20px rgba(212, 175, 55, 0.35)",
          },
        }}
      >
        <Typography
          sx={{
            color: governorate ? "white" : "#d4af37",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0.5px",
          }}
        >
          {loading
            ? isEnglish
              ? "Loading..."
              : "جاري التحميل..."
            : error
              ? isEnglish
                ? "Error Loading"
                : "خطأ في التحميل"
              : governorate || (isEnglish ? "Select City" : "اختر المدينة")}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "#d4af37",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            fontSize: "28px",
          }}
        />
      </Box>

      {/* Dropdown Menu */}
      {isOpen && !loading && !error && (
        <Box
          sx={{
            position: "absolute",
            top: "calc(100% + 12px)",
            left: 0,
            right: 0,
            background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)",
            border: "2px solid #d4af37",
            borderRadius: "12px",
            boxShadow: "0 15px 50px rgba(212, 175, 55, 0.3)",
            zIndex: 1000,
            backdropFilter: "blur(10px)",
            maxHeight: "320px",
            overflowY: "auto",
            animation: "slideDown 0.3s ease",
          }}
        >
          {governorates.map((gov, index) => {
            const govName = isEnglish
              ? gov.governorate_name_en
              : gov.governorate_name_ar;
            const isSelected = governorate === govName;

            return (
              <Box
                key={gov.id}
                onClick={() => handleSelect(govName)}
                sx={{
                  padding: "14px 20px",
                  color: isSelected ? "#0f3460" : "white",
                  backgroundColor: isSelected ? "#d4af37" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  borderBottom:
                    index !== governorates.length - 1
                      ? "1px solid rgba(212, 175, 55, 0.15)"
                      : "none",
                  fontSize: "15px",
                  fontWeight: isSelected ? 700 : 500,
                  letterSpacing: "0.3px",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "#e8c547"
                      : "rgba(212, 175, 55, 0.12)",
                    paddingLeft: "26px",
                  },
                  "&:first-of-type": {
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  },
                  "&:last-of-type": {
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    borderBottom: "none",
                  },
                }}
              >
                {govName}
              </Box>
            );
          })}
        </Box>
      )}

      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default GovernorateSelect;
