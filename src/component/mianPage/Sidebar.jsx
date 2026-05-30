import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { notEnglish, lanEnglish } from "../../store/slices/languageSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isEnglish } = useSelector((state) => state.lang);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const menuItems = [
    {
      text: isEnglish ? "Home" : "الرئيسية",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      text: isEnglish ? "Morning Remembrances" : "أذكار الصباح",
      path: "/morning",
      icon: <WbSunnyIcon />,
    },
    {
      text: isEnglish ? "Evening Remembrances" : "أذكار المساء",
      path: "/night",
      icon: <NightlightRoundIcon />,
    },
  ];

  const DrawerList = (
    <Box
      sx={{
        width: 290,
        background: "#0b1a2e",
        height: "100%",
        color: "white",
        borderRight: "1px solid rgba(201, 162, 39, 0.15)",
      }}
      role="presentation"
    >
      {/* Logo / Brand */}
      <Box
        sx={{
          padding: "32px 24px 24px",
          borderBottom: "1px solid rgba(201, 162, 39, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <h3
            style={{
              color: "#c9a227",
              fontSize: "18px",
              margin: 0,
              fontWeight: 800,
            }}
          >
            {isEnglish ? "To Remember" : "تذكر"}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "12px",
              margin: 0,
            }}
          >
            {isEnglish ? "Prayer Times & Azkar" : "مواقيت الصلاة والأذكار"}
          </p>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ mt: 1, px: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                sx={{
                  color: isActive ? "#c9a227" : "rgba(255,255,255,0.75)",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  transition: "all 0.25s ease",
                  background: isActive ? "rgba(201,162,39,0.1)" : "transparent",
                  flexDirection: "row-reverse",
                  gap: 1.5,
                  "&:hover": {
                    background: "rgba(201,162,39,0.08)",
                    color: "#c9a227",
                  },
                }}
              >
                <Box
                  sx={{
                    color: isActive ? "#c9a227" : "rgba(255,255,255,0.4)",
                    display: "flex",
                    transition: "color 0.25s",
                  }}
                >
                  {item.icon}
                </Box>
                <ListItemText
                  primary={item.text}
                  sx={{
                    textAlign: "right",
                    "& .MuiTypography-root": {
                      fontSize: "16px",
                      fontWeight: isActive ? 700 : 500,
                    },
                  }}
                />
                {isActive && (
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#c9a227",
                      flexShrink: 0,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ background: "rgba(201,162,39,0.12)", mx: 3, my: 2 }} />

      {/* Language */}
      <Box sx={{ padding: "0 20px 24px" }}>
        <p
          style={{
            color: "rgba(201,162,39,0.7)",
            fontSize: "11px",
            marginBottom: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            textAlign: "right",
          }}
        >
          {isEnglish ? "Language" : "اللغة"}
        </p>
        <ToggleButtonGroup
          exclusive
          value={isEnglish ? "en" : "ar"}
          aria-label="Language Selector"
          sx={{
            display: "flex",
            width: "100%",
            gap: "8px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "10px",
            padding: "4px",
            border: "none",
          }}
        >
          <ToggleButton
            value="ar"
            selected={!isEnglish}
            onClick={() => dispatch(notEnglish())}
            sx={{
              flex: 1,
              borderColor: "transparent !important",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.5) !important",
              borderRadius: "8px !important",
              transition: "all 0.25s ease",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "inherit",
              "&.Mui-selected": {
                backgroundColor: "#c9a227 !important",
                color: "#0b1a2e !important",
              },
              "&:hover": {
                backgroundColor: "rgba(201,162,39,0.15) !important",
              },
            }}
          >
            العربية
          </ToggleButton>
          <ToggleButton
            value="en"
            selected={isEnglish}
            onClick={() => dispatch(lanEnglish())}
            sx={{
              flex: 1,
              borderColor: "transparent !important",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.5) !important",
              borderRadius: "8px !important",
              transition: "all 0.25s ease",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "inherit",
              "&.Mui-selected": {
                backgroundColor: "#c9a227 !important",
                color: "#0b1a2e !important",
              },
              "&:hover": {
                backgroundColor: "rgba(201,162,39,0.15) !important",
              },
            }}
          >
            English
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );

  return (
    <>
      <Button
        className="sideBtn"
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1200,
          background: "#c9a227",
          color: "#0b1a2e",
          minWidth: "auto",
          width: "46px",
          height: "46px",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
          transition: "all 0.25s ease",
          "&:hover": {
            background: "#e2b94a",
            transform: "scale(1.07)",
            boxShadow: "0 6px 22px rgba(201,162,39,0.35)",
          },
        }}
      >
        <MenuIcon sx={{ fontSize: "22px" }} />
      </Button>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "4px 0 30px rgba(0,0,0,0.5)",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;
