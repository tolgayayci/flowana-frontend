import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { ISafes } from '@/types/governance';

const useSafes = () => {
    const protocol = "compound"

    const url = `/governance/${protocol}/safes`
    const { data, error, isValidating } = useSWR<ISafes, any>(protocol ? url : null , fetcher);

    return {
        safes: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useSafes;