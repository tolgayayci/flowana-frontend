import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersCountModel } from '@/types/developersTypes';

const useDevelopersMonthlyActiveDevs = () => {
    const protocol = "compound"

    const url = `/developers/${protocol}/monthly-active-devs`
    const { data, error, isValidating } = useSWR<IDevelopersCountModel, any>(protocol ? url : null , fetcher);

    return {
        monthlyActiveDevs: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersMonthlyActiveDevs;