import { atom } from 'jotai';

type Coord = {
  latitude: number;
  longitude: number;
};

export const startAtom = atom<Coord | null>(null);
export const endAtom = atom<Coord | null>(null);
export const bankIdAtom = atom<string | null>(null);

export const currentAddressAtom = atom<string | null>(null);
export const departureTimeAtom = atom<Date | null>(null);
export const arrivalTimeAtom = atom<Date | null>(null);
export const totalTimeAtom = atom<number>(0);
export const totalDistanceAtom = atom<number>(0);