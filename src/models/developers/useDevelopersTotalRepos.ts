import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersCountModel } from '@/types/developersTypes';

const useDevelopersTotalRepos = () => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/developers-total-repos`
    const { data, error, isValidating } = useSWR<IDevelopersCountModel, any>(protocol ? url : null , fetcher);

    return {
        totalRepos: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersTotalRepos;