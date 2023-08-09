import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseTopicMetrics } from '@/types/discourseTypes';

const useDiscourseTopicMetrics = () => {
    const protocol = "compound"

    const url = `/discourse/${protocol}/topic-metrics`
    const { data, error, isValidating } = useSWR<IDiscourseTopicMetrics, any>(protocol ? url : null , fetcher);

    return {
        topicMetrics: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseTopicMetrics;