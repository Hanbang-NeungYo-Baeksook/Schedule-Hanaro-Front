import markerAtm from '@/assets/icons/marker-atm.png';
import markerBankReserved from '@/assets/icons/marker-bank-reserved.png';
import markerBank from '@/assets/icons/marker-bank.png';
import markerCurrent from '@/assets/icons/marker-current.png';
import markerEnd from '@/assets/icons/marker-end.svg';
import markerStart from '@/assets/icons/marker-start.svg';

import { TMap, TMapLatLng } from '@/types';
import { reactElementToString } from '@/utils';

const { Tmapv3 } = window;

type MarkerProps = {
  mapContent: TMap;
  position: TMapLatLng;
  theme: 'start' | 'end' | 'current' | 'bank' | 'reservedBank' | 'atm';
  icon?: string;
  labelText?: string;
};

export function Marker({
  mapContent,
  position,
  theme,
  labelText,
}: MarkerProps) {
  const markerIcon =
    theme === 'current'
      ? markerCurrent
      : theme === 'start'
        ? markerStart
        : theme === 'end'
          ? markerEnd
          : theme === 'bank'
            ? markerBank
            : theme === 'reservedBank'
              ? markerBankReserved
              : markerAtm;

  return new Tmapv3.Marker({
    position,
    map: mapContent,
    icon: markerIcon,
    iconSize: new Tmapv3.Size(50, 50),
    label: labelText
      ? reactElementToString(
          <span className={`label-green`}>
            {theme === 'atm' ? labelText : labelText.split(' ')[1]}
          </span>
        )
      : '',
  });
}
