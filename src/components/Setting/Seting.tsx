import { useContext, useState } from 'react';
import cn from 'classnames';
import { getPlaces } from '../../api/openweather/opengeoApi';
import { AppContext } from '../../AppContext';
import { defineLang } from '../../helpers/defineLang';
import { City } from '../../types/City';
import './Setting.scss';

import {
  SETTING_TITLE,
  SETTING_LANGUAGE_TITLE,
  SETTING_UNITS_TITLE,
  SETTING_GEO_TITLE,
  SETTING_LANGUAGES_UK,
  SETTING_LANGUAGES_EN,
  SETTING_GEO_ON,
  SETTING_GEO_OF,
  SETTING_CHOOSE_CITY_LABEL,
  SETTING_CHOOSE_CITY_PLACEHOLDER,
  SETTING_UNITS_CLASSIC,
  SETTING_UNITS_METRIC,
  SETTING_UNITS_IMPERIAL,
  SETTING_CANT_FIND_PLACES,
  SETTING_ERROR_QUERY_EMPTY,
  SETTING_ERROR_SERVER,
} from '../../lang/Setting'

import { ReactComponent as Find } from '../../img/svg/find.svg';
import { Language, Setting as SattingType } from '../../types/Setting';
import { getCityName } from '../../helpers/getCityName';
import { getLocalName } from '../../helpers/getLocalName';

type Props = {
  isSettingActive: boolean;
  getCity: () => void;
}

export const Setting: React.FC<Props> = ({ isSettingActive, getCity }) => {
  const { setting, city, setSetting, setCity } = useContext(AppContext);
  const { lang, useGeolocation, units } = setting;
  
  const name = getCityName(city, lang);

  const [query, setQuery] = useState(name);
  const [places, setPlaces] = useState<City[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cantFind, setCantFind] = useState(false)

  function getUniqId(arr: City[]) {
    if (!arr.length) {
      return 1;
    }

    const ids = arr.map(el => el.id || 0);
    const maxId = Math.max(...ids);

    return maxId + 1;
  }

  const findPlaces = () => {
    if (!query.trim()) {
      setError(defineLang(SETTING_ERROR_QUERY_EMPTY, lang));
      return;
    };

    setIsLoading(true);

    getPlaces(query)
      .then((res) => {
        if (!res.length) {
          setCantFind(true);
          return;
        };

        const newPlaces: City[] = [];

        res.forEach((data:
          {
            lat: any;
            lon: any;
            name: any;
            country: any;
            state: any;
            local_names: {
              en: any;
              uk: any;
            }
          }
        ) => {
          const newPlace: City = {
            coord: {
              lat: data.lat,
              lon: data.lon,
            },
            id: getUniqId(newPlaces),
            name: {
              uk: getLocalName(data, 'uk'),
              en: getLocalName(data, 'en'),
              def: data.name,
            },
            country: data.country,
            state: data.state || '',
          }

          newPlaces.push(newPlace);
        });

        setPlaces(newPlaces);
      })
      .catch(() => {
        setError(defineLang(SETTING_ERROR_SERVER, lang));
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleButtonOn = () => {
    const newSetting: SattingType = {
      ...setting,
      useGeolocation: true,
    }
    setSetting(newSetting);
    getCity();
  }

  const handleButtonOff = () => {
    const newSetting: SattingType = {
      ...setting,
      useGeolocation: false,
    }
    setSetting(newSetting);
    setQuery(name);
  }

  const handleButtonClassic = () => {
    const newSetting: SattingType = {
      ...setting,
      units: 'classic',
    }
    setSetting(newSetting);
  }

  const handleButtonImperial = () => {
    const newSetting: SattingType = {
      ...setting,
      units: 'imperial',
    }
    setSetting(newSetting);
  }

  const handleButtonMetric = () => {
    const newSetting: SattingType = {
      ...setting,
      units: 'metric',
    }
    setSetting(newSetting);
  }

  const handleButtonUk = () => {
    const newSetting: SattingType = {
      ...setting,
      lang: 'uk',
    }
    setSetting(newSetting);
  }

  const handleButtonEn = () => {
    const newSetting: SattingType = {
      ...setting,
      lang: 'en',
    }
    setSetting(newSetting);
  }

  const handleKeyUpEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    findPlaces();
  }

  const handleFindClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    findPlaces();
  }

  const reset = () => {
    setError('');
    setCantFind(false);
    setPlaces([]);
  }

  return (
    <div className={cn('setting', { 'setting--active': isSettingActive })}>
      <h1 className="setting__title">
        {defineLang(SETTING_TITLE, lang)}
      </h1>

      <div className="setting__block">
        <h2 className="setting__subtitle">
          {defineLang(SETTING_GEO_TITLE, lang)}
        </h2>
        <div className="setting__buttons">
          <button
            onClick={handleButtonOn}
            name="changeGeoOn"
            type="button"
            className={cn('setting__button button', { 'button--active': useGeolocation })}
          >
            {defineLang(SETTING_GEO_ON, lang)}
          </button>
          <button
            onClick={handleButtonOff}
            name="changeGeoOf"
            type="button"
            className={cn('setting__button button', { 'button--active': !useGeolocation })}
          >
            {defineLang(SETTING_GEO_OF, lang)}
          </button>
        </div>
      </div>

      <div className="setting__block">
        <h2 className="setting__subtitle">
          {defineLang(SETTING_UNITS_TITLE, lang)}
        </h2>
        <div className="setting__buttons">
          <button
            onClick={handleButtonMetric}
            name="changeToMetric"
            type="button"
            className={cn('setting__button button', { 'button--active': units === 'metric' })}
          >
            {defineLang(SETTING_UNITS_METRIC, lang)}
          </button>
          <button
            onClick={handleButtonClassic}
            name="changeToClassic"
            type="button"
            className={cn('setting__button button', { 'button--active': units === 'classic' })}
          >
            {defineLang(SETTING_UNITS_CLASSIC, lang)}
          </button>
          <button
            onClick={handleButtonImperial}
            name="changeToImperial"
            type="button"
            className={cn('setting__button button', { 'button--active': units === 'imperial' })}
          >
            {defineLang(SETTING_UNITS_IMPERIAL, lang)}
          </button>
        </div>
      </div>

      <div className="setting__block">
        <h2 className="setting__subtitle">
          {defineLang(SETTING_LANGUAGE_TITLE, lang)}
        </h2>
        <div className="setting__buttons">
          <button
            onClick={handleButtonEn}
            name="changeToEn"
            type="button"
            className={cn('setting__button button', { 'button--active': lang === 'en' })}
          >
            {defineLang(SETTING_LANGUAGES_EN, lang)}
          </button>
          <button
            onClick={handleButtonUk}
            name="changeToUk"
            type="button"
            className={cn('setting__button button', { 'button--active': lang === 'uk' })}
          >
            {defineLang(SETTING_LANGUAGES_UK, lang)}
          </button>
        </div>
      </div>

      {!useGeolocation && (
        <label className="setting__input-label">
          {defineLang(SETTING_CHOOSE_CITY_LABEL, lang)}
          <div className="setting__input-block">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                reset();
              }}
              onKeyUp={handleKeyUpEnter}
              className="setting__input"
              name="chooseCity"
              type="text"
              placeholder={defineLang(SETTING_CHOOSE_CITY_PLACEHOLDER, lang)}
            />
            {!isLoading
              ? (
                <a href="/#"
                  className="setting__input-icon"
                  onClick={handleFindClick}
                >
                  <Find width={30} height={30} />
                </a>)
              : (
                <div className="setting__input-icon">
                  <img
                    src="./img/loader_trans.gif"
                    alt="loading"
                    style={{ height: '30px' }}
                  />
                </div>
              )}
          </div>
        </label>
      )}

      <div className="setting__places-block">
        {(error && !isLoading) && (
          <div className="setting__places setting__places--error">
            <span
              className="setting__error"
            >
              {error}
            </span>
          </div>
        )}
        {(cantFind) && (
          <div className="setting__places">
            <span
              className="setting__place-name"
            >
              {defineLang(SETTING_CANT_FIND_PLACES, lang)}
            </span>
          </div>
        )}
        {(places.length > 0 && !error && !cantFind)
          && (
            <div className="setting__places">
              {places.map(place => {
                const handlePlaceClick = (
                  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                ) => {
                  e.preventDefault();

                  setCity(place);
                  const newPlaceName = getCityName(place, lang);
                  setQuery(newPlaceName);
                  reset();
                }

                return (
                  <a
                    onClick={handlePlaceClick}
                    href="/#"
                    className="setting__place"
                    key={place.id}
                  >
                    <span className="setting__place-country">{place.country}</span>
                    <span className="setting__place-name">{getCityName(place, lang) || place.name.def}</span>
                    {place.state && (
                      <span className="setting__place-state">{place.state}</span>
                    )}
                  </a>
                )
              })}
            </div>
          )}
      </div>
    </div>
  );
};