import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { notEnglish, lanEnglish } from "../../store/slices/languageSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { isEnglish } = useSelector((state) => state.lang);

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          [`${isEnglish ? "Morning Remembrances" : "اذكار الصبح"}`, "/morning"],
          [`${isEnglish ? "Evening Remembrances" : "اذكار المساء "}`, "/night"],
        ].map((text) => (
          <ListItem key={text[0]} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(text[1]);
              }}
            >
              <ListItemText primary={text[0]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const [alignment, setAlignment] = useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Button
        variant="outlined"
        className="sideBtn"
        onClick={toggleDrawer(true)}
      >
        <ArrowForwardIosIcon color="disabled" className="sidebarIcon" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          style={{ display: "block", textAlign: "center" }}
        >
          <ToggleButton value="Ar" onClick={() => dispatch(notEnglish())}>
            العربية
          </ToggleButton>
          <ToggleButton value="en" onClick={() => dispatch(lanEnglish())}>
            english
          </ToggleButton>
        </ToggleButtonGroup>
      </Drawer>
    </>
  );
};

export default Sidebar;
