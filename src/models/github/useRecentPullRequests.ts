import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

const useRecentPullRequests = (protocol: string) => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const url = `/protocols/${protocol}/recent-pull-requests?owner=${owner}&repo=${repo}&order_by=updated_at`
    const { data, error, isValidating } = useSWR(repo ? url : null , fetcher);

    if(!error && !data) console.log("Loading repository info...");
    if(error) console.log("Error loading repository info: ", error);
    if(data) console.log(data);

    return {
        recentPullRequests: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentPullRequests;