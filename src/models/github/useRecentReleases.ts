import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IRecentReleases } from '@/types/githubTypes';

const useRecentReleases = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "compound"

    const url = `/github-project/${protocol}/recent-releases?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IRecentReleases[]>(repo ? url : null , fetcher);

    return {
        recentReleases: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentReleases;