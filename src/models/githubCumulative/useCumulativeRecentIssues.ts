import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeRecentIssues } from '@/types/githubCumulativeTypes';

const useCumulativeRecentIssues = (order_by: string = "created_at") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-recent-issues?order_by=${order_by}`
    const { data, error, isValidating } = useSWR<ICumulativeRecentIssues[], any>(repo ? url : null , fetcher);

    return {
        recentIssues: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeRecentIssues;