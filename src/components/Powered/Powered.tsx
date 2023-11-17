import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { defineLang } from '../../helpers/defineLang';
import './Powered.scss';

const POWERED_OPENWEATHER_TITLE = {
  en: 'Powered by:',
  uk: 'Дані надано:',
}

const POWERED_UNSPLASH_TITLE = {
  en: 'Photo from:',
  uk: 'Фото надано:',
}

const POWERED_AUTHOR = {
  en: 'Author:',
  uk: 'Автор:',
}

const POWERED_OPENWEATHER_LINK = "https://openweathermap.org/";
const POWERED_UNSPLASH_LINK = "https://unsplash.com/";

type Props = {
  user: {
    firstName: string;
    lastName: string;
    link: string;
  };
};

export const Powered: React.FC<Props> = ({ user }) => {
  const { setting } = useContext(AppContext);
  const { lang } = setting;

  const { firstName, lastName, link } = user;

  return (
    <div className="powered">
      <div className="powered__block">
        <p className="powered__title">
          {defineLang(POWERED_OPENWEATHER_TITLE, lang)}
        </p>
        <a
          href={POWERED_OPENWEATHER_LINK}
          className="powered__link"
        >
          OpenWeather
        </a>
      </div>
      <div className="powered__block">
        <p className="powered__title">
          {defineLang(POWERED_UNSPLASH_TITLE, lang)}
        </p>
        <a
          href={POWERED_UNSPLASH_LINK}
          className="powered__link"
        >
          Unsplash
        </a>
        <p className="powered__author">
          {defineLang(POWERED_AUTHOR, lang)}
        </p>
        <a
          href={link}
          className="powered__link"
        >
          {`${firstName || 'Unsplash'} ${lastName || ''}`}
        </a>
      </div>
    </div>
  );
};
