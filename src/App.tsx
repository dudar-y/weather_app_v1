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

const ERROR_CITY_COORD = {
  en: 'Failed to determine geolocation. Allow geolocation, or disable the option in the settings.',
  uk: 'Не вдалось визначити геолокацію. Дозвольте визначення геолокації, або відключіть опцію в налаштуваннях.',
};

const ERROR_CITY_API = {
  en: 'Failed to automatically determine geolocation. You can choose the location manually in the settings.',
  uk: 'Не вдалось автоматично визначити геолокацію. Ви можете вибрати локацію вручну в налаштуваннях.',
};

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
  const [background, setBeckground] = useState<Background>(INITIAL_BACKGROUND);
  const [isSettingActive, setIsSettingActive] = useState(false);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<ForecastType[]>([]);

  const {
    latitude: latitudeFromGeo,
    longitude: longitudeFromGeo,
    error: errorFromGeo,
  } = useGeolocation();

  const { setting, city, setCity } = useContext(AppContext);
  const { lang, units } = setting;

  const handleSettingActive = (v: boolean) => {
    setIsSettingActive(v);
  }

  const photoParams = useMemo(() => {
    return getPhotoParams();
  }, [])

  useEffect(() => {
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
      .catch(() => { });
  }, [photoParams]);

  const getCityFromApi = () => {
    if (errorFromGeo) {
      console.log(defineLang(ERROR_CITY_COORD, lang));
      setError(defineLang(ERROR_CITY_COORD, lang));
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

          console.log(newCity);
          setCity(newCity);
        })
        .catch((e) => {
          console.log(e);
          setError(defineLang(ERROR_CITY_API, lang));
        });
    };
  };

  const getWeatherFromApi = () => {
    if (city.coord) {
      const { lat: latitude, lon: longitude } = city.coord;
      getForecastData({ latitude, longitude }, lang, units)
        .then((res) => {
          const weatherNow = res.list[0];
          const newWeather = {
            main_params: {
              temp: weatherNow.main.temp,
              feels_like: weatherNow.main.feels_like,
              temp_min: weatherNow.main.temp_min,
              temp_max: weatherNow.main.temp_max,
              pressure: weatherNow.main.pressure,
              humidity: weatherNow.main.humidity,
            },
            info_params: {
              status: weatherNow.weather[0].main,
              description: weatherNow.weather[0].description,
            },
            wind_params: {
              speed: weatherNow.wind.speed,
              gust: weatherNow.wind.gust,
            },
          };

          setWeather(newWeather);
        })
        .catch((e) => {
          setError(e);
        })
    };
  };

  const getForecastFromApi = () => {
    if (city.coord) {
      const { lat: latitude, lon: longitude } = city.coord;
      getForecastData({ latitude, longitude }, lang, units)
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
    };
  };

  const getAllWeatherDataFromApi = () => {
    if (city.coord) {
      const { lat: latitude, lon: longitude } = city.coord;
      getForecastData({ latitude, longitude }, lang, units)
        .then((res) => {
          const weatherNow = res.list[0];
          const newWeather = {
            main_params: {
              temp: weatherNow.main.temp,
              feels_like: weatherNow.main.feels_like,
              temp_min: weatherNow.main.temp_min,
              temp_max: weatherNow.main.temp_max,
              pressure: weatherNow.main.pressure,
              humidity: weatherNow.main.humidity,
            },
            info_params: {
              status: weatherNow.weather[0].main,
              description: weatherNow.weather[0].description,
            },
            wind_params: {
              speed: weatherNow.wind.speed,
              gust: weatherNow.wind.gust,
            },
          };

          setWeather(newWeather);

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
        .catch((e) => {
          setError(e);
        })
    }
  }

  // useEffect(() => {
  //   getCityFromApi();
  // }, [setting, lang])

  // useEffect(() => {
  //   console.log('get');
  //   getCityFromApi();
  //   getAllWeatherDataFromApi();
  // }, []);

  useEffect(() => {
    getWeatherFromApi();
  }, [city, setting]);

  // useEffect(() => {
  //   getCityFromApi();
  // }, [coord, setting.useGeolocation]);

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${background.url})` }}
    >
      <Setting isSettingActive={isSettingActive} getCity={getCityFromApi} />
      <SettingIcon isSettingActive={isSettingActive} onSettingActive={handleSettingActive} />
      <main className="app__main main">
        <WeatherNow data={weather} error={error} />
        {/* <Forecast /> */}
      </main>
    </div>
  );
}

export default App;
