import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeRecentPullRequests } from '@/types/githubCumulativeTypes';

const useCumulativeRecentPullRequests = (order_by: string = "created_at") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-recent-pull-requests?order_by=${order_by}`
    const { data, error, isValidating } = useSWR<ICumulativeRecentPullRequests[], any>(repo ? url : null , fetcher);

    return {
        recentPullRequests: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeRecentPullRequests;