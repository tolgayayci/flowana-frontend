import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseUserMetrics } from '@/types/discourseTypes';

const useDiscourseUserMetrics = (interval: string = "yearly") => {
    const protocol = "compound"

    const url = `/discourse/${protocol}/user-metrics`
    const { data, error, isValidating } = useSWR<IDiscourseUserMetrics, any>(protocol ? url : null , fetcher);

    return {
        discourseUserMetrics: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseUserMetrics;