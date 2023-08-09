import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IRecentIssues } from '@/types/githubTypes';

const useRecentIssues = (order_by: string = "created_at") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "compound"

    const url = `/github-project/${protocol}/recent-issues?owner=${owner}&repo=${repo}&order_by=${order_by}`
    const { data, error, isValidating } = useSWR<IRecentIssues[]>(repo ? url : null , fetcher);

    return {
        recentIssues: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentIssues;