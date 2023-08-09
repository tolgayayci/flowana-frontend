import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IPullRequestActivity } from '@/types/githubTypes';

const usePullRequestActivity = (interval: string = "month") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "compound"

    const url = `/github-project/${protocol}/pull-request-activity?owner=${owner}&repo=${repo}&interval=${interval}`
    const { data, error, isValidating } = useSWR<IPullRequestActivity>(repo ? url : null , fetcher);

    return {
        pullRequestActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default usePullRequestActivity;