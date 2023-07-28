import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeStats } from '@/types/githubCumulativeTypes';

const useCumulativeStats = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-stats`
    const { data, error, isValidating } = useSWR<ICumulativeStats, any>(repo ? url : null , fetcher);

    return {
        cumulativeStats: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeStats;