import { QUERY_KEYS } from '@/constants/queryKeys';
import { useMutation } from '@tanstack/react-query';
import {
  PostRecommendList,
  PostRecommendListResponse,
} from '@/api/customer/recommends';
import { isLoadingAtom, recommendListAtom, tagListAtom } from '@/stores';
import { useAtom } from 'jotai';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';

const usePostRecommendList = () => {
  const { toast } = useToast();

  const [, setRecommendList] = useAtom(recommendListAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [, setTagList] = useAtom(tagListAtom);

  return useMutation({
    mutationKey: [QUERY_KEYS.RECOMMEND],
    mutationFn: PostRecommendList,
    onSuccess: ({ recommends, tags }: PostRecommendListResponse) => {
      console.log(recommends);
      setRecommendList(recommends);
      setTagList(tags);
      setIsLoading(false);
    },
    onError(error) {
      showToast(toast, error.message);
    },
  });
};

export default usePostRecommendList;
