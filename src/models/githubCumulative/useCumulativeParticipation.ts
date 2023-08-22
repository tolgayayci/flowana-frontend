import useSWRImmutable from 'swr/immutable';import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeParticipation } from '@/types/githubCumulativeTypes';

const useCumulativeParticipation = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/participation`
    const { data, error, isValidating } = useSWRImmutable<ICumulativeParticipation, any>(protocol ? url : null , fetcher);

    return {
        participation: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeParticipation;