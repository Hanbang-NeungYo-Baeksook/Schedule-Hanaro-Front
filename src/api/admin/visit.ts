import { API_ROUTE } from '@/constants/route';
import {
  AdminVisitInquiryInfoResponse,
  AdminVisitStatusUpdateResponse,
} from '../../types/Visit';
import { AxiosError } from 'axios';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.admin + '/visits';

// 특정 방문 상담 상세 정보 조회
export const getVisitDetail = async (visitId: number) => {
  return (await apiCall.get(
    `${BASE_URL}/${visitId}/content`
  )) as AdminVisitInquiryInfoResponse;
};

// 방문 상담 상태 업데이트
export const updateVisitStatus = async (visitId: number) => {
  try {
    const fullUrl = `${BASE_URL}/${visitId}/status`;
    console.log('전체 URL:', fullUrl);

    const response = await apiCall.patch(fullUrl);
    console.log('상태 업데이트 응답:', response);
    return response as AdminVisitStatusUpdateResponse;
  } catch (error) {
    // AxiosError 타입으로 캐스팅
    if (error instanceof Error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('에러 응답:', {
          status: axiosError.response.status,
          data: axiosError.response.data,
          headers: axiosError.response.headers,
        });
      } else if (axiosError.request) {
        console.error('요청 에러:', axiosError.request);
      } else {
        console.error('에러 메시지:', axiosError.message);
      }
      console.error('에러 설정:', axiosError.config);
    } else {
      console.error('알 수 없는 에러:', error);
    }
    throw error;
  }
};

// 현재 진행중인 상담 조회
export const getVisitStatus = async (sectionId: number) => {
  try {
    console.log('API 호출 시작:', `${BASE_URL}/sections/${sectionId}/current`);
    const response = await apiCall.get(
      `${BASE_URL}/sections/${sectionId}/current`
    );
    console.log('API 응답:', response);

    // 응답이 비어있거나 next_num이 0인 경우, 대기 중인 첫 번째 방문을 조회
    if (!response.next_num) {
      try {
        const pendingVisit = await apiCall.get(
          `${BASE_URL}/sections/${sectionId}/current`
        );
        console.log('대기 중인 첫 번째 방문:', pendingVisit);

        if (pendingVisit && pendingVisit.data) {
          // data 객체 확인
          return {
            ...response,
            next_num: pendingVisit.data.num || pendingVisit.num,
            next_category: pendingVisit.data.category || pendingVisit.category,
          } as AdminVisitStatusUpdateResponse;
        }
      } catch (pendingError) {
        console.error('대기 방문 조회 에러:', pendingError);
      }
    }

    return response as AdminVisitStatusUpdateResponse;
  } catch (error) {
    console.error('API 호출 에러:', error);
    // 에러 발생시 기본값 반환
    return {
      previous_num: 0,
      previous_category: '',
      current_num: 0,
      current_category: '',
      next_num: 0, // 첫 번째 대기번호
      next_category: 'DEPOSIT',
      section_info: {
        section_id: sectionId,
        section_type: 'VISIT',
        current_num: 0,
        wait_amount: 0,
        wait_time: 0,
        today_visitors: 0,
      },
    } as AdminVisitStatusUpdateResponse;
  }
};
