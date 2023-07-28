import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeParticipation } from '@/types/githubCumulativeTypes';

const useCumulativeParticipation = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-participation`
    const { data, error, isValidating } = useSWR<ICumulativeParticipation, any>(repo ? url : null , fetcher);

    return {
        participation: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeParticipation;