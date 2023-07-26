import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseCategories } from '@/types/discourseTypes';

const useDiscourseCategories = () => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/discourse-categories`
    const { data, error, isValidating } = useSWR<IDiscourseCategories, any>(protocol ? url : null , fetcher);

    return {
        discourseCategories: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseCategories;