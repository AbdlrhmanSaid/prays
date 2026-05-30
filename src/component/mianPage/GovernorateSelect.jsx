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
          background: "rgba(201, 162, 39, 0.1)",
          border: `2px solid ${isOpen ? "#c9a227" : "rgba(201,162,39,0.4)"}`,
          borderRadius: "14px",
          padding: "16px 22px",
          cursor: loading || error ? "not-allowed" : "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "all 0.25s ease",
          boxShadow: isOpen ? "0 0 20px rgba(201,162,39,0.2)" : "none",
          "&:hover": {
            background: "rgba(201, 162, 39, 0.15)",
            borderColor: "#c9a227",
          },
        }}
      >
        <Typography
          sx={{
            color: governorate ? "white" : "rgba(201,162,39,0.7)",
            fontSize: "16px",
            fontWeight: 500,
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
            color: "#c9a227",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            fontSize: "26px",
          }}
        />
      </Box>

      {/* Dropdown Menu */}
      {isOpen && !loading && !error && (
        <Box
          sx={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: 0,
            right: 0,
            background: "#0b1a2e",
            border: "1.5px solid rgba(201,162,39,0.35)",
            borderRadius: "12px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            zIndex: 1000,
            maxHeight: "320px",
            overflowY: "auto",
            animation: "slideDown 0.25s ease",
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
                  color: isSelected ? "#0b1a2e" : "rgba(255,255,255,0.8)",
                  backgroundColor: isSelected ? "#c9a227" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  borderBottom:
                    index !== governorates.length - 1
                      ? "1px solid rgba(201, 162, 39, 0.12)"
                      : "none",
                  fontSize: "15px",
                  fontWeight: isSelected ? 700 : 500,
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "#e2b94a"
                      : "rgba(201, 162, 39, 0.1)",
                    color: isSelected ? "#0b1a2e" : "white",
                  },
                  "&:first-of-type": { borderTopLeftRadius: "10px", borderTopRightRadius: "10px" },
                  "&:last-of-type": { borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", borderBottom: "none" },
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
