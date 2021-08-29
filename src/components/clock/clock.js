import React, { useState } from "react";
import './clock.css';
import i18n from "../../utilies/i18n";
import { useTranslation } from 'react-i18next';
// import toEnglishDigits from "../../utilies/number";

function Clock() {
  const {t} = useTranslation();
  const [isfa , setfa] = useState(false);
  const Detectfa = (lng) => {
    if (lng === 'fa')
       setfa(true);
    else
       setfa(false);
  }

  i18n.on('languageChanged', (lng) => {
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
            <p className={isfa ? 'clock PersianNo' : 'clock'}>{t(currentTime)}</p>
            <p className={isfa ? 'clock PersianNo' : 'clock'}>{t(currentDate)}</p>
      </div>
    </>
  );
}

export default Clock;
