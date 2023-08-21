import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseUserMetrics } from '@/types/discourseTypes';

const useDiscourseUserMetrics = (interval: string = "yearly") => {
    const { protocol } = useProtocol()

    const url = `/discourse/${protocol["protocol"]}/user-metrics`
    const { data, error, isValidating } = useSWRImmutable<IDiscourseUserMetrics, any>(protocol ? url : null , fetcher);

    return {
        discourseUserMetrics: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseUserMetrics;