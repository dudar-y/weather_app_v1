import React, { useMemo } from 'react';
import { AppContext } from './AppContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LocalStorageKeys } from './types/LocalStorageKeys';
import { Setting } from './types/Setting';

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [city, setCity] = useLocalStorage(
    LocalStorageKeys.city,
    {
      name: {
        uk: '',
        en: '',
        def: '',
      },
      country: '',
      coord: {
        lat: 0,
        lon: 0,
      }
    },
  );

  const [setting, setSetting] = useLocalStorage<Setting>(
    LocalStorageKeys.setting,
    {
      lang: 'en',
      useGeolocation: true,
      units: 'metric',
    });

  const state = useMemo(() => ({
    setting,
    city,
    setSetting,
    setCity,
  }), [setting, city]);

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};
