import React, { useState } from "react";
import "./clock.css";
import i18n from "../../utilies/i18n";
// import { useTranslation } from "react-i18next";
import moment from "jalali-moment";

function Clock() {
  // const { t } = useTranslation();
  const [isfa, setfa] = useState(false);
  const Detectfa = (lng) => {
    if (lng === "fa") setfa(true);
    else setfa(false);
  };

  i18n.on("languageChanged", (lng) => {
    Detectfa(lng);
  });

  let time = new Date().toLocaleTimeString();
  let [currentTime, settime] = useState(time);

  let date = new Date().toLocaleDateString();
  let [currentDate, setdate] = useState(date);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    settime(time);
    let date = new Date().toLocaleDateString();
    setdate(date);
  };

  setInterval(updateTime, 1000);
  return (
    <>
      <div className="main">
        <p className={isfa ? "clock-rtl PersianNo" : "clock-ltr"}> {currentTime} </p>{" "}
        <p className={isfa ? "date PersianNo" : "date none"}>
          {" "}
          {moment({ currentDate }).locale("fa").format("YYYY/M/D")}{" "}
        </p>{" "}
        <p className={isfa ? "clock none PersianNo" : "date"}> {currentDate} </p>{" "}
      </div>{" "}
    </>
  );
}

export default Clock;
