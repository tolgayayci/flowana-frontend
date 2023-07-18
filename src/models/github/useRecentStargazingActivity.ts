import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IRecentStargazingActivity } from '@/types/githubTypes';

const useRecentStargazingActivity = (protocol: string) => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const url = `/protocols/${protocol}/recent-stargazing-activity?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IRecentStargazingActivity, any>(repo ? url : null , fetcher);

    return {
        recentStargazingActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentStargazingActivity;