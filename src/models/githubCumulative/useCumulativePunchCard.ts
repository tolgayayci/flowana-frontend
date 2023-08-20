import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativePunchCard } from '@/types/githubCumulativeTypes';

const useCumulativePunchCard = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/punch-card`
    const { data, error, isValidating } = useSWR<ICumulativePunchCard[], any>(repo ? url : null , fetcher);

    return {
        punchCard: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativePunchCard;