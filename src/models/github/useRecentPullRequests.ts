import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IRecentPullRequests } from '@/types/githubTypes';

const useRecentPullRequests = (order_by: string = "created_at") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/recent-pull-requests?owner=${owner}&repo=${repo}&order_by=${order_by}`
    const { data, error, isValidating } = useSWR<IRecentPullRequests[]>(repo ? url : null , fetcher);

    return {
        recentPullRequests: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentPullRequests;