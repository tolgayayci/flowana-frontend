import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseTopicActivity } from '@/types/discourseTypes';

const useDiscourseTopicActivity = (interval: string = "yearly") => {
    const protocol = "compound"

    const url = `/discourse/${protocol}/topic-activity?interval=${interval}`
    const { data, error, isValidating } = useSWR<IDiscourseTopicActivity, any>(protocol ? url : null , fetcher);

    return {
        discourseTopicActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseTopicActivity;