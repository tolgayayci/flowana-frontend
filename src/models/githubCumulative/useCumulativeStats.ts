import useSWRImmutable from 'swr/immutable';import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeStats } from '@/types/githubCumulativeTypes';

const useCumulativeStats = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/stats`
    const { data, error, isValidating } = useSWRImmutable<ICumulativeStats, any>(protocol ? url : null , fetcher);

    return {
        stats: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeStats;