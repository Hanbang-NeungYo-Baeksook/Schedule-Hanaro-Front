import { BranchOrder, SectionType } from '@/api/customer/branches';
import { PostCallRequest, Status } from '@/api/customer/calls';
import { InquiryStatus, PostInquiryRequest } from '@/api/customer/inquires';
import { RecommendData } from '@/api/customer/recommends';
import { PostVisitRequest } from '@/api/customer/visits';
import { atom } from 'jotai';

export type Coord = {
  latitude: number;
  longitude: number;
};

export const startAtom = atom<Coord | null>(null);
export const endAtom = atom<Coord | null>(null);
export const branchIdAtom = atom<string | null>(null);

export const currentStartAddressAtom = atom<string | null>(null);
export const departureTimeAtom = atom<Date | null>(null);
export const arrivalTimeAtom = atom<Date | null>(null);
export const totalTimeAtom = atom<number>(0);
export const totalDistanceAtom = atom<number>(0);

export const mapClickAtom = atom<boolean>(false);

export const callStatusAtom = atom<Status>('PENDING');
export const inquiryStatusAtom = atom<InquiryStatus>('PENDING');
export const branchOrderByAtom = atom<BranchOrder>('distance');
export const sectionTypeAtom = atom<SectionType>('DEPOSIT');

export const recommendListAtom = atom<RecommendData[]>([]);
export const isLoadingAtom = atom(false);
export const tagListAtom = atom<string[]>([]);

export const contentAtom = atom<string>('');

export const postCallRequestAtom = atom<PostCallRequest>();
export const postInquiryRequestAtom = atom<PostInquiryRequest>();
export const postVisitRequestAtom = atom<PostVisitRequest>();
