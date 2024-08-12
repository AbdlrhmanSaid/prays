import React, { useEffect, useState } from "react";
import { Container, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPrays } from "../store/slices/getPraySlice";
import { getGovernorates } from "../store/slices/getCity";
import HeaderPage from "./mianPage/Header";
import PrayerList from "./mianPage/PrayerList";
import GovernorateSelect from "./mianPage/GovernorateSelect";
import Sidebar from "./mianPage/Sidebar";
import "../index.css";
import { Helmet } from "react-helmet";
import logo from "../assets/logo.jpeg";

const HomePage = () => {
  const dispatch = useDispatch();
  const pray = useSelector((state) => state.pray.timings);
  const { governorates, loading, error } = useSelector((state) => state.city);
  const [governorate, setGovernorate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // Load governorate from localStorage when component mounts
    const savedGovernorate = localStorage.getItem("selectedGovernorate");
    if (savedGovernorate) {
      setGovernorate(savedGovernorate);
    }

    dispatch(getGovernorates());
  }, [dispatch]);

  useEffect(() => {
    if (governorate) {
      dispatch(getPrays(governorate));
      localStorage.setItem("selectedGovernorate", governorate);
    }
  }, [governorate, dispatch]);

  const handleChange = (event) => {
    setGovernorate(event.target.value);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
      );
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <Helmet>
        <title> {governorate} | مواقيت الصلاه </title>
        <link rel="icon" type="image/jpeg" href={logo} />{" "}
      </Helmet>
      <HeaderPage governorate={governorate} />
      <Divider style={{ borderColor: "white" }} />

      <div className="selcetDiv d-flex mt-3">
        <GovernorateSelect
          governorate={governorate}
          handleChange={handleChange}
          governorates={governorates}
          loading={loading}
          error={error}
        />
      </div>
      <PrayerList pray={pray} time={time} />
      <Sidebar />
    </Container>
  );
};

export default HomePage;
