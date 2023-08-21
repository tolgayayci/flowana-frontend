import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICommitActivity } from '@/types/githubTypes';

const useCommitActivity = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/commit-activity?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<ICommitActivity[], any>(repo ? url : null , fetcher);

    return {
        commitActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCommitActivity;