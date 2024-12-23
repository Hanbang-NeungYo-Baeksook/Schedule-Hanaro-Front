import { API_ROUTE } from '@/constants/route';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.customer + '/recommends';

export type RecommendData = {
  recommend_id: number;
  query: string;
  response: string;
  similarity: number;
};

export type PostRecommendListRequest = {
  query: string;
};

export type PostRecommendListResponse = {
  recommends: RecommendData[];
  tags: string[];
};

export const PostRecommendList = async ({
  query,
}: PostRecommendListRequest) => {
  return (await apiCall.post(BASE_URL, { query })) as PostRecommendListResponse;
};
