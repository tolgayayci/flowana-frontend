import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeRecentReleases } from '@/types/githubCumulativeTypes';

const useCumulativeRecentCommits = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-recent-releases`
    const { data, error, isValidating } = useSWR<ICumulativeRecentReleases[], any>(repo ? url : null , fetcher);

    return {
        recentReleases: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeRecentCommits;