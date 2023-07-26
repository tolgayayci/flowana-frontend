import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseTopTopics } from '@/types/discourseTypes';

const useDiscourseTopTopics = (interval: string = "monthly") => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/discourse-top-topics?interval=${interval}`
    const { data, error, isValidating } = useSWR<IDiscourseTopTopics[], any>(protocol ? url : null , fetcher);

    return {
        discourseTopTopics: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseTopTopics;