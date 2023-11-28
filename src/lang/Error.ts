const ERROR_INITIAL = {
  en: 'To continue, please enable geolocation access in your browser or select place.',
  uk: 'Для продовження, будь-ласка, надайте доступ до геолокації в своєму браузері або оберіть населений пункт.',
}

const ERROR_CITY_COORD = {
  en: 'Failed to determine geolocation. Allow geolocation, or disable the option in the settings.',
  uk: 'Не вдалось визначити геолокацію. Дозвольте визначення геолокації, або відключіть опцію в налаштуваннях.',
};

const ERROR_CITY_API = {
  en: 'Failed to automatically determine geolocation. You can choose the location manually in the settings.',
  uk: 'Не вдалось автоматично визначити геолокацію. Ви можете вибрати локацію вручну в налаштуваннях.',
};

const ERROR_WEATHER_API = {
  en: 'Unable to load weather data. Please choose another location in the settings or try again later.',
  uk: 'Неможливо завантажити дані про погоду. Будь ласка вибаріть іншу локацію в налаштуваннях, або спробуйте пізніше.',
};

const ERROR_FORECAST_API = {
  en: 'Unable to load forecast data. Please choose another location in the settings or try again later.',
  uk: 'Неможливо завантажити дані прогнозу погоди. Будь ласка вибаріть іншу локацію в налаштуваннях, або спробуйте пізніше.',
};

export {
  ERROR_INITIAL,
  ERROR_CITY_COORD,
  ERROR_CITY_API,
  ERROR_WEATHER_API,
  ERROR_FORECAST_API,
};
