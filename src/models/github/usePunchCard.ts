import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IPunchCard } from '@/types/githubTypes';

const usePunchCard = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/punch-card?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IPunchCard[]>(repo ? url : null , fetcher);

    return {
        punchCard: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default usePunchCard;