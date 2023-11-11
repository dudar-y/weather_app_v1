import React from 'react';
import { City } from './types/City';
import { Setting } from './types/Setting';

type State = {
  setting: Setting;
  setSetting: (v: Setting) => void;
  city: City,
  setCity: (v: City) => void;
};

const initialState: State = {
  setting: {
    lang: 'en',
    useGeolocation: true,
    units: 'metric',
  },
  city: {
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
  setSetting: () => {},
  setCity: () => {},
};

export const AppContext = React.createContext(initialState);
