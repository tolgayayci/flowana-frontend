import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseLatestTopics } from '@/types/discourseTypes';

const useDiscourseLatestTopics = (order: string = "default") => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/discourse-latest-topics?order=${order}`
    const { data, error, isValidating } = useSWR<IDiscourseLatestTopics[], any>(protocol ? url : null , fetcher);

    return {
        discourseLatestTopics: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseLatestTopics;