import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    {
      text: isEnglish ? "Home" : "الرئيسية",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      text: isEnglish ? "Morning Remembrances" : "اذكار الصباح",
      path: "/morning",
      icon: <WbSunnyIcon />,
    },
    {
      text: isEnglish ? "Evening Remembrances" : "اذكار المساء",
      path: "/night",
      icon: <NightlightRoundIcon />,
    },
  ];

  const DrawerList = (
    <Box
      sx={{
        width: 300,
        background: "linear-gradient(135deg, #0a192f 0%, #112240 100%)",
        height: "100%",
        color: "white",
      }}
      role="presentation"
    >
      <Box sx={{ padding: "30px 20px", textAlign: "center", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" }}>
        <h2 style={{ color: "#d4af37", fontSize: "28px", margin: "0", fontWeight: "800", letterSpacing: "1px" }}>
          {isEnglish ? "Menu" : "القائمة"}
        </h2>
      </Box>
      
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                sx={{
                  color: isActive ? "#d4af37" : "white",
                  padding: "15px 25px",
                  transition: "all 0.3s ease",
                  backgroundColor: isActive ? "rgba(212, 175, 55, 0.1)" : "transparent",
                  borderLeft: isActive ? "4px solid #d4af37" : "4px solid transparent",
                  "&:hover": {
                    background: "rgba(212, 175, 55, 0.15)",
                    paddingLeft: "30px",
                  },
                }}
              >
                <Box sx={{ minWidth: "45px", display: "flex", color: isActive ? "#d4af37" : "rgba(255, 255, 255, 0.7)" }}>
                  {item.icon}
                </Box>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "17px",
                      fontWeight: isActive ? 700 : 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider
        sx={{ background: "rgba(212, 175, 55, 0.2)", margin: "20px 25px" }}
      />

      <Box sx={{ padding: "10px 25px" }}>
        <p
          style={{
            color: "#d4af37",
            fontSize: "13px",
            marginBottom: "15px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          {isEnglish ? "Language" : "اللغة"}
        </p>
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={isEnglish ? "en" : "Ar"}
          aria-label="Language Selector"
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ToggleButton
            value="Ar"
            selected={!isEnglish}
            onClick={() => dispatch(notEnglish())}
            sx={{
              flex: 1,
              color: "white",
              borderColor: "#d4af37 !important",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "white !important",
              transition: "all 0.3s ease",
              "&.Mui-selected": {
                backgroundColor: "#d4af37 !important",
                color: "#0a192f !important",
              },
              "&:hover": {
                backgroundColor: "rgba(212, 175, 55, 0.2)",
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
              color: "white",
              borderColor: "#d4af37 !important",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "white !important",
              transition: "all 0.3s ease",
              "&.Mui-selected": {
                backgroundColor: "#d4af37 !important",
                color: "#0a192f !important",
              },
              "&:hover": {
                backgroundColor: "rgba(212, 175, 55, 0.2)",
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
          left: "20px", /* Changed from right to left */
          zIndex: 1200,
          background: "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)",
          color: "#0a192f",
          minWidth: "auto",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          "&:hover": {
            transform: "scale(1.1) rotate(180deg)",
            background: "#d4af37",
          }
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: "20px" }} /> {/* Changed icon to point correctly */}
      </Button>
      <Drawer
        anchor="left" /* Changed from right to left */
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none"
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;
