import useSWRImmutable from 'swr/immutable';import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IProjects } from '@/types/githubLeaderboard';

const useProjects = () => {
    const { protocol } = useProtocol()

    const url = `/github-leaderboard/${protocol["protocol"]}/projects`
    const { data, error, isValidating } = useSWRImmutable<IProjects[], any>(protocol ? url : null , fetcher);

    return {
        projects: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useProjects;