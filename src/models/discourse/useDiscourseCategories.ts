import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseCategories } from '@/types/discourseTypes';

const useDiscourseCategories = () => {
    const { protocol } = useProtocol()
    
    const url = `/discourse/${protocol["protocol"]}/categories`
    const { data, error, isValidating } = useSWRImmutable<IDiscourseCategories[], any>(protocol ? url : null , fetcher);

    return {
        discourseCategories: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseCategories;