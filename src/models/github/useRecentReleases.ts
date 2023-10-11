import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IRecentReleases } from '@/types/githubTypes';

const useRecentReleases = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol, isInitialised } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/recent-releases?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IRecentReleases[]>(isInitialised ? url : null , fetcher);

    return {
        recentReleases: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentReleases;