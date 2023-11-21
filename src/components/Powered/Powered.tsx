import { useContext } from 'react';
import './Powered.scss';
import { AppContext } from '../../AppContext';
import { defineLang } from '../../helpers/defineLang';
import {
  POWERED_AUTHOR,
  POWERED_OPENWEATHER_LINK,
  POWERED_OPENWEATHER_TITLE,
  POWERED_UNSPLASH_LINK,
  POWERED_UNSPLASH_TITLE
} from '../../lang/Powered';

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
    <footer className="powered">
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
    </footer>
  );
};
