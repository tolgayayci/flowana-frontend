import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IPunchCard } from '@/types/githubTypes';

const usePunchCard = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol, isInitialised } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/punch-card?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IPunchCard[]>(isInitialised ? url : null , fetcher);

    return {
        punchCard: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default usePunchCard;