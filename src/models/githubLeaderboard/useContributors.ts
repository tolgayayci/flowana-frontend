import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IContributors } from '@/types/githubTypes';

const useContributors = () => {
    const protocol = "lens"

    const url = `/github-leaderboard/${protocol}/contributors`
    const { data, error, isValidating } = useSWR<IContributors[], any>(protocol ? url : null , fetcher);

    return {
        contributors: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useContributors;