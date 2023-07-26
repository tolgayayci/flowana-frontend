import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IPullRequestCount } from '@/types/githubTypes';

const usePullRequestCount = (protocol: string) => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const url = `/protocols/${protocol}/pull-request-count?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IPullRequestCount>(repo ? url : null , fetcher);

    return {
        pullRequestCount: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default usePullRequestCount;