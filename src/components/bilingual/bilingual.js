import "./bilingual.css";
import English from "../assets/english.svg";
import Persian from "../assets/persian.svg";
import chooselanguage from "../assets/chooselanguage.svg";
import { useTranslation } from "react-i18next";
import i18n from "../utilies/i18n";

const Bilingual = () => {
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // change direrction persian -> rtl / english -> ltr
  };

  return (
    <div>
      <div className="dropdown footer-language">
        <div
          className="btn btn-light dropdown-toggle App-label"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={chooselanguage} alt="Choose Language" />
          {t("footer.language")}
        </div>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li onClick={() => changeLanguage("en")}>
            <img src={English} alt="English" />
            {t("footer.english")}
          </li>
          <li onClick={() => changeLanguage("fa")}>
            <img src={Persian} alt="Persian" />
            {t("footer.persian")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Bilingual;
