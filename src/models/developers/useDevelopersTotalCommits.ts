import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersCountModel } from '@/types/developersTypes';

const useDevelopersTotalCommits = () => {
    const protocol = "compound"

    const url = `/developers/${protocol}/total-commits`
    const { data, error, isValidating } = useSWR<IDevelopersCountModel, any>(protocol ? url : null , fetcher);

    return {
        totalCommits: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersTotalCommits;