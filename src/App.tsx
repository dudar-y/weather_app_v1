/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import './App.scss';
import { useGeolocation } from './hooks/useGeolocation';
import { getPhoto } from './api/unsplash/unsplashApi';
import { getPhotoParams } from './helpers/getPhotoParams';
import { SettingIcon } from './components/Header/SettingIcon';
import { WeatherNow } from './components/WeatherNow/WeatherNow';
import { Forecast } from './components/Forecast/Forecast';
import { getForecastData } from './api/openweather/openweatherApi';
import { City } from './types/City';
import { Weather } from './types/Weather';
import { getTimeFromUnix } from './helpers/getTimeFromUnix';
import { ForecastType } from './types/ForecastType';
import { getDayFromUnix } from './helpers/getDayFromUnix';
import { getDateFromUnix } from './helpers/getDateFormUnix';
import { Setting } from './components/Setting/Seting';
import { AppContext } from './AppContext';
import { defineLang } from './helpers/defineLang';
import { Background } from './types/Background';
import { getPlaceByCoord } from './api/openweather/opengeoApi';
import { getLocalName } from './helpers/getLocalName';
import { Loader } from './components/Loader/Loader';
import { SelectCity } from './components/SelectCity/SelectCity';
import { getRealVhFromListener } from './helpers/getRealVhFromListener';
import { Powered } from './components/Powered/Powered';

import {
  ERROR_CITY_API,
  ERROR_FORECAST_API,
  ERROR_INITIAL,
  ERROR_WEATHER_API
} from './lang/Error';

const INITIAL_BACKGROUND = {
  color: "#91bad6",
  id: "1601134467661",
  url: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  user: {
    firstName: "Neda",
    lastName: "Astani",
    link: "https://unsplash.com/@nedaastani",
  },
}

const App: React.FC = () => {
  const { setting, city, setCity } = useContext(AppContext);
  const { lang, units } = setting;

  const [background, setBeckground] = useState<Background | null>(null);
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(true);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [isForecastLoading, setIsForecastLoading] = useState(true);
  const [isSettingActive, setIsSettingActive] = useState(false);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<ForecastType[]>([]);

  const {
    latitude: latitudeFromGeo,
    longitude: longitudeFromGeo,
    error: errorFromGeo,
  } = useGeolocation();

  const handleSettingActive = (v: boolean) => {
    setIsSettingActive(v);
  };

  const photoParams = useMemo(() => {
    return getPhotoParams();
  }, [])

  useEffect(getRealVhFromListener, []);

  const getPhotoFromApi = () => {
    getPhoto(photoParams)
      .then((res) => {
        const newBackground = {
          color: res.color,
          id: res.id,
          url: res.urls.full,
          user: {
            firstName: res.user.first_name,
            lastName: res.user.last_name,
            link: res.links.html,
          },
        }
        setBeckground(newBackground);
      })
      .catch((e) => {
        setBeckground(INITIAL_BACKGROUND);
        console.log(e)
      })
  }

  useEffect(() => {
    getPhotoFromApi();
  }, [photoParams]);

  useEffect(() => {
    setIsBackgroundLoading(true);
    if (background) {
      const backgroundImage = new Image();
      backgroundImage.src = background.url;

      backgroundImage.onload = () => {
        setIsBackgroundLoading(false);
      };
    }
  }, [background])

  const getCityFromApi = () => {
    if (errorFromGeo) {
      return;
    }

    if (latitudeFromGeo && longitudeFromGeo) {
      setError('');
      getPlaceByCoord({ latitude: latitudeFromGeo, longitude: longitudeFromGeo })
        .then((res) => {
          const data = res[0];

          const newCity: City = {
            name: {
              uk: getLocalName(data, 'uk'),
              en: getLocalName(data, 'en'),
              def: data.name,
            },
            country: data.country,
            coord: {
              lat: data.lat,
              lon: data.lon,
            },
            state: data.state,
          }

          setCity(newCity);
        })
        .catch((e) => {
          setError(defineLang(ERROR_CITY_API, lang));
        });
    };
  };

  const getWeatherFromApi = () => {
    setIsWeatherLoading(true);
    if (city.coord) {
      const { lat: latitude, lon: longitude } = city.coord;
      getForecastData({ latitude, longitude }, 'en', units)
        .then((res) => {
          console.log(res)
          const weatherNow = res.list[0];
          const newWeather: Weather = {
            main_params: {
              temp: weatherNow.main.temp,
              feels_like: weatherNow.main.feels_like,
              temp_min: weatherNow.main.temp_min,
              temp_max: weatherNow.main.temp_max,
              pressure: weatherNow.main.pressure,
              humidity: weatherNow.main.humidity,
              rain: weatherNow.rain ? true : false,
              sunrise: getTimeFromUnix(res.city.sunrise),
              sunset: getTimeFromUnix(res.city.sunset),
            },
            info_params: {
              status: weatherNow.weather[0].main,
              description: weatherNow.weather[0].description,
              icon: weatherNow.weather[0].icon,
            },
            wind_params: {
              speed: weatherNow.wind.speed,
              gust: weatherNow.wind.gust,
            },
          };

          setWeather(newWeather);
        })
        .catch(() => {
          setError(defineLang(ERROR_WEATHER_API, lang));
        })
        .finally(() => setIsWeatherLoading(false));
    };
  };

  const getForecastFromApi = () => {
    setIsForecastLoading(true);
    if (city.coord) {
      const { lat: latitude, lon: longitude } = city.coord;
      getForecastData({ latitude, longitude }, 'en', units)
        .then((res) => {
          const newForecast: ForecastType[] = [];
          const forecastList = res.list;

          forecastList.forEach((data: {
            dt: number;
            main: {
              temp: any;
              feels_like: any;
              temp_min: any;
              temp_max: any;
              pressure: any;
              humidity: any;
            };
            weather: [
              main: any,
              description: any
            ]
            wind: {
              speed: any;
              gust: any;
            };
          }) => {
            const newName = getDayFromUnix(data.dt);
            const day = newForecast.find(el => el.name === newName);

            if (!day) {
              const newForecastData: ForecastType = {
                name: getDayFromUnix(data.dt),
                date: getDateFromUnix(data.dt),
                times: [{
                  time: getTimeFromUnix(data.dt),
                  main_params: {
                    temp: data.main.temp,
                    feels_like: data.main.feels_like,
                    temp_min: data.main.temp_min,
                    temp_max: data.main.temp_max,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                  },
                  info_params: {
                    status: data.weather[0].main,
                    description: data.weather[0].description,
                  },
                  wind_params: {
                    speed: data.wind.speed,
                    gust: data.wind.gust,
                  },
                }]
              };

              newForecast.push(newForecastData);
            } else {
              const newTimeForecast = {
                time: getTimeFromUnix(data.dt),
                main_params: {
                  temp: data.main.temp,
                  feels_like: data.main.feels_like,
                  temp_min: data.main.temp_min,
                  temp_max: data.main.temp_max,
                  pressure: data.main.pressure,
                  humidity: data.main.humidity,
                },
                info_params: {
                  status: data.weather[0].main,
                  description: data.weather[0].description,
                },
                wind_params: {
                  speed: data.wind.speed,
                  gust: data.wind.gust,
                },
              };

              day.times.push(newTimeForecast);
            }
          })

          setForecast(newForecast);
        })
        .catch(() => {
          setError(defineLang(ERROR_FORECAST_API, lang));
        })
        .finally(() => {
          setIsForecastLoading(false);
        });
    };
  };

  useEffect(() => {
    getCityFromApi();
  }, [errorFromGeo, latitudeFromGeo])

  useEffect(() => {
    if (city.coord.lat) {
      getWeatherFromApi();
      getForecastFromApi();
    }
  }, [city, setting]);

  useEffect(() => {
    const updateWeather = setInterval(() => {
      getWeatherFromApi();
      getForecastFromApi();
    }, 10 * 60 * 1000);

    const updatePhoto = setInterval(() => {
      getPhotoFromApi();
    }, 4 * 60 * 60 * 1000);


    return () => {
      clearInterval(updatePhoto);
      clearInterval(updateWeather);
    };
  }, []);

  return (
    <div className="app">
      {!isBackgroundLoading && background
        ? (
          <div
            className="app__container"
            style={{ backgroundImage: `url(${background.url})` }}
          >
            <Setting
              isSettingActive={isSettingActive}
              getCity={getCityFromApi}
              color={background.color}
            />
            <SettingIcon isSettingActive={isSettingActive} onSettingActive={handleSettingActive} />
            {(city.coord.lat !== 0)
              ? (<main className="app__main main">
                <WeatherNow
                  data={weather}
                  error={error}
                  isLoading={isWeatherLoading}
                />
                <Forecast data={forecast.slice(0, 5)} isLoading={isForecastLoading} />
              </main>)
              : (<>
                <div className="app__initial">
                  <span className="app__initial-message">
                    {defineLang(ERROR_INITIAL, lang)}
                  </span>
                </div>
                <div className="app__select-city">
                  <SelectCity />
                </div>
              </>)}
            <Powered user={background.user} />
          </div>)
        : (
          <div className="app__loader">
            <Loader />
          </div>
        )}
    </div>
  );
}

export default App;
