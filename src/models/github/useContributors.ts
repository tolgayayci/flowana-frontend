import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IContributor } from '@/types/githubLeaderboard';

const useContributors = () => {
    const { protocol, isInitialised } = useProtocol();

    const url = `/github-leaderboard/${protocol["protocol"]}/contributors`
    const { data, error, isValidating } = useSWRImmutable<IContributor[]>(isInitialised ? url : null , fetcher);

    return {
        contributors: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useContributors;