import useSWRImmutable from 'swr/immutable';import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeRecentPullRequests } from '@/types/githubCumulativeTypes';

const useCumulativeRecentPullRequests = (order_by: string = "created_at") => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/recent-pull-requests?order_by=${order_by}`
    const { data, error, isValidating } = useSWRImmutable<ICumulativeRecentPullRequests[], any>(repo ? url : null , fetcher);

    return {
        recentPullRequests: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeRecentPullRequests;