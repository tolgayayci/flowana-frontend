import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IHealthScore } from '@/types/githubTypes';

const useHealthScore = (protocol: string) => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const url = `/protocols/${protocol}/health-score?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IHealthScore>(repo ? url : null , fetcher);

    return {
        healthScore: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useHealthScore;