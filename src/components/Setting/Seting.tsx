import { useContext, useMemo } from 'react';
import cn from 'classnames';
import hexToRgba from 'hex-to-rgba';
import { AppContext } from '../../AppContext';
import { defineLang } from '../../helpers/defineLang';
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
  SETTING_UNITS_CLASSIC,
  SETTING_UNITS_METRIC,
  SETTING_UNITS_IMPERIAL,
} from '../../lang/Setting'

import { Setting as SattingType } from '../../types/Setting';
import { SelectCity } from '../SelectCity/SelectCity';

type Props = {
  isSettingActive: boolean;
  getCity: () => void;
  color: string;
}

export const Setting: React.FC<Props> = ({ isSettingActive, getCity, color }) => {
  const { setting, setSetting } = useContext(AppContext);
  const { lang, useGeolocation, units } = setting;

  const rgbaColor = useMemo(() => {
    return hexToRgba(color, 0.5)
  }, [color]);

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

  return (
    <div
      className={cn('setting', { 'setting--active': isSettingActive })}
      style={{backgroundColor: rgbaColor}}
    >
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
        <div className="setting__select-city">
          <SelectCity />
        </div>
      )}
    </div>
  );
};
