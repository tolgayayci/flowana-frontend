import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IRecentStargazingActivity } from '@/types/githubTypes';

const useRecentStargazingActivity = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "compound"

    const url = `/github-project/${protocol}/recent-stargazing-activity?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IRecentStargazingActivity, any>(repo ? url : null , fetcher);

    return {
        recentStargazingActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentStargazingActivity;