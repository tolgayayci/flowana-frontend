import useSWRImmutable from 'swr/immutable';import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IContributors } from '@/types/githubTypes';

const useContributors = () => {
    const { protocol } = useProtocol()

    const url = `/github-leaderboard/${protocol["protocol"]}/contributors`
    const { data, error, isValidating } = useSWRImmutable<IContributors[], any>(protocol ? url : null , fetcher);

    return {
        contributors: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useContributors;