import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IRecentCommits } from '@/types/githubTypes';

const useRecentCommits = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "compound"

    const url = `/github-project/${protocol}/recent-commits?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IRecentCommits[], any>(repo ? url : null , fetcher);

    return {
        recentCommits: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentCommits;