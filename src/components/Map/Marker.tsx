// import markermyGreen from '@/assets/icons/marker-my-green.svg';
import markerAtmSelected from '@/assets/icons/marker-atm-selected.svg';
import markerAtm from '@/assets/icons/marker-atm.svg';
import markerBankReservedSelected from '@/assets/icons/marker-bank-reserved-selected.svg';
import markerBankReserved from '@/assets/icons/marker-bank-reserved.svg';
import markerBankSelected from '@/assets/icons/marker-bank-selected.svg';
import markerBank from '@/assets/icons/marker-bank.png';
import markerCurrent from '@/assets/icons/marker-current.png';
import markerEnd from '@/assets/icons/marker-end.svg';
import markerStart from '@/assets/icons/marker-start.svg';
// import markerMyPurple from '@/assets/icons/marker-purple.svg';

import { TMap, TMapLatLng } from '@/types';
import { reactElementToString } from '@/utils';

const { Tmapv3 } = window;

type MarkerProps = {
  mapContent: TMap;
  position: TMapLatLng;
  theme:
    | 'start'
    | 'end'
    | 'current'
    | 'branch'
    | 'selectedBranch'
    | 'reservedBranch'
    | 'selectedReservedBranch'
    | 'atm'
    | 'selectedAtm';
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
          : theme === 'branch'
            ? markerBank
            : theme === 'selectedBranch'
              ? markerBankSelected
              : theme === 'reservedBranch'
                ? markerBankReserved
                : theme === 'selectedReservedBranch'
                  ? markerBankReservedSelected
                  : theme === 'atm'
                    ? markerAtm
                    : markerAtmSelected;
  return new Tmapv3.Marker({
    position,
    map: mapContent,
    icon: markerIcon,
    iconSize: new Tmapv3.Size(50, 50),
    label: labelText
      ? reactElementToString(
          <span className={`label-green`}>{labelText.split(' ')[1]}</span>
        )
      : '',
  });
}
