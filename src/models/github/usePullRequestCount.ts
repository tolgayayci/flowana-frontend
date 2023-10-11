import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IPullRequestCount } from '@/types/githubTypes';

const usePullRequestCount = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol, isInitialised } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/pull-request-count?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IPullRequestCount>(isInitialised ? url : null , fetcher);

    return {
        pullRequestCount: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default usePullRequestCount;