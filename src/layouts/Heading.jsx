import React from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Heading = ({ title }) => {
  const { isEnglish } = useSelector((state) => state.lang);

  const navigate = useNavigate();
  return (
    <div className="heading text-center py-5">
      <Container>
        <h1>{title}</h1>
        <h4>
          <span
            className="prev-sapn"
            onClick={() => {
              navigate("/");
            }}
          >
            {isEnglish ? "Main" : "الرئيسية"}{" "}
          </span>{" "}
          / <span className="target-span"> {title}</span>
        </h4>
      </Container>
    </div>
  );
};

export default Heading;
