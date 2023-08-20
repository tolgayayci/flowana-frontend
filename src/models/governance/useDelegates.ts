import useSWR from 'swr';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDelegates } from '@/types/governance';

const useDelegates = (sort_by: string) => {
    const { protocol } = useProtocol()

    const url = `/governance/${protocol["protocol"]}/delegates?sort_by=${sort_by}`
    const { data, error, isValidating } = useSWR<IDelegates[], any>(protocol ? url : null , fetcher);

    return {
        delegates: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDelegates;