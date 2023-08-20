import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeStats } from '@/types/githubCumulativeTypes';

const useCumulativeStats = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/stats`
    const { data, error, isValidating } = useSWR<ICumulativeStats, any>(repo ? url : null , fetcher);

    return {
        cumulativeStats: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeStats;