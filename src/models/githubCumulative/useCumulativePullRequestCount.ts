import useSWRImmutable from 'swr/immutable';import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativePullRequestCount } from '@/types/githubCumulativeTypes';

const useCumulativePullRequestCount = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/pull-request-count`
    const { data, error, isValidating } = useSWRImmutable<ICumulativePullRequestCount, any>(protocol ? url : null , fetcher);

    return {
        pullRequestCount: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativePullRequestCount;