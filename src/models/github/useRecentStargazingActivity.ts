import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IRecentStargazingActivity } from '@/types/githubTypes';

const useRecentStargazingActivity = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/recent-stargazing-activity?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IRecentStargazingActivity, any>(repo ? url : null , fetcher);

    return {
        recentStargazingActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentStargazingActivity;