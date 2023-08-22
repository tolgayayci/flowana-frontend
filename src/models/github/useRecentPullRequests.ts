import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IRecentPullRequests } from '@/types/githubTypes';

const useRecentPullRequests = (order_by: string = "created_at") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/recent-pull-requests?owner=${owner}&repo=${repo}&order_by=${order_by}`
    const { data, error, isValidating } = useSWRImmutable<IRecentPullRequests[]>(protocol ? url : null , fetcher);

    return {
        recentPullRequests: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentPullRequests;