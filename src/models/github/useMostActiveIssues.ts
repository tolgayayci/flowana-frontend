import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

const useMostActiveIssues = (protocol: string) => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const url = `/protocols/${protocol}/most-active-issues?owner=${owner}&repo=${repo}&interval=week`
    const { data, error, isValidating } = useSWR(repo ? url : null , fetcher);

    if(!error && !data) console.log("Loading repository info...");
    if(error) console.log("Error loading repository info: ", error);
    if(data) console.log(data);

    return {
        mostActiveIssues: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useMostActiveIssues;