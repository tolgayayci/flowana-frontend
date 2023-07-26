import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseTag } from '@/types/discourseTypes';

const useDiscourseTags = () => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/discourse-tags`
    const { data, error, isValidating } = useSWR<IDiscourseTag[], any>(protocol ? url : null , fetcher);

    return {
        discourseTags: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseTags;