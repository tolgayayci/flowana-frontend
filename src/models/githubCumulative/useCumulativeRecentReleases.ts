import useSWRImmutable from 'swr/immutable';import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeRecentReleases } from '@/types/githubCumulativeTypes';

const useCumulativeRecentReleases = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/recent-releases`
    const { data, error, isValidating } = useSWRImmutable<ICumulativeRecentReleases[], any>(protocol ? url : null , fetcher);

    return {
        recentReleases: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeRecentReleases;