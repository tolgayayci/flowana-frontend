import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativePunchCard } from '@/types/githubCumulativeTypes';

const useCumulativePunchCard = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-punch-card`
    const { data, error, isValidating } = useSWR<ICumulativePunchCard[], any>(repo ? url : null , fetcher);

    return {
        punchCard: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativePunchCard;