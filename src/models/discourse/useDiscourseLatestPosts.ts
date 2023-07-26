import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseLatestPosts } from '@/types/discourseTypes';

const useDiscourseLatestPosts = () => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/discourse-latest-posts`
    const { data, error, isValidating } = useSWR<IDiscourseLatestPosts[], any>(protocol ? url : null , fetcher);

    return {
        latestPosts: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseLatestPosts;