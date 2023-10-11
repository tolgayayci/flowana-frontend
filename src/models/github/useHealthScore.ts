import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IHealthScore } from '@/types/githubTypes';

const useHealthScore = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol, isInitialised } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/health-score?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IHealthScore>(isInitialised ? url : null , fetcher);

    return {
        healthScore: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useHealthScore;