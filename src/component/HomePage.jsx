import React from "react";
import { Container } from "@mui/material";
import WallClock from "./mianPage/WallClock";
import PrayerList from "./mianPage/PrayerList";
import GovernorateSelect from "./mianPage/GovernorateSelect";
import Sidebar from "./mianPage/Sidebar";
import "../index.css";
import { Helmet } from "react-helmet";
import logo from "../assets/logo.jpeg";
import useGovSelect from "../hooks/useGovSelect";

const HomePage = () => {
  const { governorate, handleChange, governorates, loading, error } =
    useGovSelect();
  return (
    <Container>
      <Helmet>
        <title>{governorate} | مواقيت الصلاة</title>
        <link rel="icon" type="image/jpeg" href={logo} />
      </Helmet>

      <WallClock governorate={governorate} />

      <div className="selcetDiv d-flex mt-3">
        <GovernorateSelect
          governorate={governorate}
          handleChange={handleChange}
          governorates={governorates}
          loading={loading}
          error={error}
        />
      </div>
      <PrayerList />
      <Sidebar />
    </Container>
  );
};

export default HomePage;
