import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseTopicMetrics } from '@/types/discourseTypes';

const useDiscourseTopicMetrics = () => {
    const { protocol } = useProtocol()

    const url = `/discourse/${protocol["protocol"]}/topic-metrics`
    const { data, error, isValidating } = useSWRImmutable<IDiscourseTopicMetrics, any>(protocol ? url : null , fetcher);

    return {
        topicMetrics: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseTopicMetrics;