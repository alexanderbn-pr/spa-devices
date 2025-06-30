import './header.scss';
import { LANGUAGES } from '../../constants';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/icons/logo.png';

const Header = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (
    event
  ) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };


  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <div className="header-language">
        <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className="header-language-select"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
