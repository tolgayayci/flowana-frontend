import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IParticipation } from '@/types/githubTypes';

const useParticipation = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol, isInitialised } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/participation?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IParticipation>(isInitialised ? url : null , fetcher);

    return {
        participation: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useParticipation;