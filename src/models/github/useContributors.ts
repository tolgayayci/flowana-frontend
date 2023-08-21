import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IContributors } from '@/types/githubTypes';

const useContributors = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/contributors?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IContributors[]>(repo ? url : null , fetcher);

    return {
        contributors: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useContributors;