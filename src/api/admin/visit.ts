import { API_ROUTE } from '@/constants/route';
import { AdminVisitInquiryInfoResponse, AdminVisitStatusUpdateResponse } from '../../types/Visit';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.admin + '/visits';

// 특정 방문 상담 상세 정보 조회
export const getVisitDetail = async (visitId: number) => {
  return (await apiCall.get(`${BASE_URL}/${visitId}/content`)) as AdminVisitInquiryInfoResponse;
};

// 방문 상담 상태 업데이트
export const updateVisitStatus = async (visitId: number) => {
  return (await apiCall.patch(`${BASE_URL}/${visitId}/status`)) as AdminVisitStatusUpdateResponse;
};

// 현재 진행중인 상담 조회
export const getCurrentVisit = async (sectionId: number) => {
  return (await apiCall.get(`${BASE_URL}/sections/${sectionId}/current`)) as AdminVisitStatusUpdateResponse;
}; 