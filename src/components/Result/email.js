import React from "react";
import "antd/dist/antd.css";
import "./email.css";
import email from "../../assets/email.png";
import English from "../../assets/english.svg";
import Persian from "../../assets/persian.svg";
import chooselanguage from "../../assets/chooselanguage.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../utilies/i18n";
import {  Button,Dropdown,Menu} from "antd";
import { Helmet } from "react-helmet";

const Email = () => {

   const { t } = useTranslation();
   const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // change direrction persian -> rtl / english -> ltr
  };
  const menu = (
    <Menu>
      <Menu.Item>
      <li onClick={() => changeLanguage("en")}>
            <img src={English} alt="English" />
            {t("footer.english")}
       </li>
      </Menu.Item>
      <Menu.Item>
      
      <li onClick={() => changeLanguage("fa")}>
            <img src={Persian} alt="Persian" />
            {t("footer.persian")}
      </li>
      </Menu.Item>
    </Menu>
  );

  return (
    

    <div className="card card-mail">
    <Helmet>
        <title>{t('title.email')}</title>
      </Helmet>
      <img src={email} className="email"></img>
    
      <h2 className="notif">
        {t('email.send')}
        <br />
        {t('email.check')}
      </h2>
       
        {/* Bilingual */}
        <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button className="btn-footer">  
            <img src={chooselanguage} alt="Choose Language" />
            {t("footer.language")}
          </Button>
        </Dropdown>
    </div>
  );
};

export default Email;
