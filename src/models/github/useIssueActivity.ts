import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IIssueActivity } from '@/types/githubTypes';

const useIssueActivity = (interval: string = "month") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "lens"

    const url = `/github-project/${protocol}/issue-activity?owner=${owner}&repo=${repo}&interval=${interval}`
    const { data, error, isValidating } = useSWR<IIssueActivity>(repo ? url : null , fetcher);

    return {
        issueActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useIssueActivity;