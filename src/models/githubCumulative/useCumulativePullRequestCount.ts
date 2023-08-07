import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativePullRequestCount } from '@/types/githubCumulativeTypes';

const useCumulativePullRequestCount = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "lens"

    const url = `/github-ecosystem/${protocol}/pull-request-count`
    const { data, error, isValidating } = useSWR<ICumulativePullRequestCount, any>(repo ? url : null , fetcher);

    return {
        pullRequestCount: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativePullRequestCount;