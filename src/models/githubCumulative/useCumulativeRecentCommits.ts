import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeRecentCommits } from '@/types/githubCumulativeTypes';

const useCumulativeRecentCommits = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-recent-commits`
    const { data, error, isValidating } = useSWR<ICumulativeRecentCommits[], any>(repo ? url : null , fetcher);

    return {
        recentCommits: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeRecentCommits;