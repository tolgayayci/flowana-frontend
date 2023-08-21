import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseTopicActivity } from '@/types/discourseTypes';

const useDiscourseTopicActivity = (interval: string = "yearly") => {
    const { protocol } = useProtocol()

    const url = `/discourse/${protocol["protocol"]}/topic-activity?interval=${interval}`
    const { data, error, isValidating } = useSWRImmutable<IDiscourseTopicActivity, any>(protocol ? url : null , fetcher);

    return {
        discourseTopicActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseTopicActivity;