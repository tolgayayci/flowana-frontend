import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IParticipationCount } from '@/types/githubTypes';

const useParticipationCount = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol, isInitialised } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/participation_count?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IParticipationCount>(isInitialised ? url : null , fetcher);

    return {
        participationCount: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useParticipationCount;