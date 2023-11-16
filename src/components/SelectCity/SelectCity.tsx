import './SelectCity.scss';
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import { defineLang } from "../../helpers/defineLang";
import { getCityName } from "../../helpers/getCityName";
import { City } from "../../types/City";
import { ReactComponent as Find } from '../../img/svg/find.svg';
import { Setting as SettingType } from '../../types/Setting';

import {
  SETTING_CANT_FIND_PLACES,
  SETTING_CHOOSE_CITY_LABEL,
  SETTING_CHOOSE_CITY_PLACEHOLDER,
  SETTING_ERROR_QUERY_EMPTY,
  SETTING_ERROR_SERVER,
} from "../../lang/Setting";

import { getPlaces } from "../../api/openweather/opengeoApi";
import { getLocalName } from "../../helpers/getLocalName";


export const SelectCity = () => {
  const { setting, city, setCity, setSetting } = useContext(AppContext);
  const { lang } = setting;

  const name = getCityName(city, lang);

  const [query, setQuery] = useState(name);
  const [places, setPlaces] = useState<City[]>([]);
  const [error, setError] = useState('');
  const [cantFind, setCantFind] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function getUniqId(arr: City[]) {
    if (!arr.length) {
      return 1;
    }

    const ids = arr.map(el => el.id || 0);
    const maxId = Math.max(...ids);

    return maxId + 1;
  };

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

  const handleKeyUpEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    findPlaces();
  };

  const handleFindClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    findPlaces();
  };

  const reset = () => {
    setError('');
    setCantFind(false);
    setPlaces([]);
  };

  return (
    <>
      <label className="select-city__input-label">
        {defineLang(SETTING_CHOOSE_CITY_LABEL, lang)}
        <div className="select-city__input-block">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              reset();
            }}
            onKeyUp={handleKeyUpEnter}
            className="select-city__input"
            name="chooseCity"
            type="text"
            placeholder={defineLang(SETTING_CHOOSE_CITY_PLACEHOLDER, lang)}
          />
          {!isLoading
            ? (
              <a href="/#"
                className="select-city__input-icon"
                onClick={handleFindClick}
              >
                <Find width={30} height={30} />
              </a>)
            : (
              <div className="select-city__input-icon">
                <img
                  src="./img/loader_trans.gif"
                  alt="loading"
                  style={{ height: '30px' }}
                />
              </div>
            )}
        </div>
      </label>
      <div className="select-city__places-block">
        {(error && !isLoading) && (
          <div className="select-city__places setting__places--error">
            <span
              className="select-city__error"
            >
              {error}
            </span>
          </div>
        )}
        {(cantFind) && (
          <div className="select-city__places">
            <span
              className="select-city__place-name"
            >
              {defineLang(SETTING_CANT_FIND_PLACES, lang)}
            </span>
          </div>
        )}
        {(places.length > 0 && !error && !cantFind)
          && (
            <div className="select-city__places">
              {places.map(place => {
                const handlePlaceClick = (
                  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                ) => {
                  e.preventDefault();

                  const newSetting: SettingType = {
                    ...setting,
                    useGeolocation: false,
                  }
                  setSetting(newSetting);
          
                  setCity(place);
                  const newPlaceName = getCityName(place, lang);
                  setQuery(newPlaceName);
                  reset();
                }

                return (
                  <a
                    onClick={handlePlaceClick}
                    href="/#"
                    className="select-city__place"
                    key={place.id}
                  >
                    <span className="select-city__place-country">{place.country}</span>
                    <span className="select-city__place-name">{getCityName(place, lang) || place.name.def}</span>
                    {place.state && (
                      <span className="select-city__place-state">{place.state}</span>
                    )}
                  </a>
                )
              })}
            </div>
          )}
      </div>
    </>
  )
}
