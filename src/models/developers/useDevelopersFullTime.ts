import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersCountModel } from '@/types/developersTypes';

const useDevelopersFullTime = () => {
    const protocol = "compound"

    const url = `/developers/${protocol}/full-time`
    const { data, error, isValidating } = useSWR<IDevelopersCountModel, any>(protocol ? url : null , fetcher);

    return {
        fullTime: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersFullTime;