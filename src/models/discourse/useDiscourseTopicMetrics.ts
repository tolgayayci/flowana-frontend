import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseTopicMetrics } from '@/types/discourseTypes';

const useDiscourseTopicMetrics = () => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/discourse-topic-metrics`
    const { data, error, isValidating } = useSWR<IDiscourseTopicMetrics, any>(protocol ? url : null , fetcher);

    return {
        discourseTopicMetrics: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseTopicMetrics;