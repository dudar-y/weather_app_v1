import React from 'react';
import cn from 'classnames';
import './SettingIcon.scss';

import { ReactComponent as Setting } from '../../img/svg/settings.svg';
import { ReactComponent as Cross } from '../../img/svg/cross.svg';

type Props = {
  isSettingActive: boolean;
  onSettingActive: (v: boolean) => void;
}

export const SettingIcon: React.FC<Props> = (
  { isSettingActive, onSettingActive }
) => {
  const handleButtonSettingClick = () => {
    onSettingActive(true);
  }

  const handleButtonCrossClick = () => {
    onSettingActive(false);
  }

  return (
    <div className={cn('app__set set', { 'set--cross': isSettingActive})}>
      {!isSettingActive
        ? (<button
          onClick={handleButtonSettingClick}
          type="button"
          className="set__icon"
        >
          <Setting width={30} height={30} />
        </button>)
        : (<button
          onClick={handleButtonCrossClick}
          type="button"
          className="set__icon"
        >
          <Cross width={30} height={30} />
        </button>)}
    </div>
  );
};
