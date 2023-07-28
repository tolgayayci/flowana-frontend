import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeMostActiveIssues } from '@/types/githubCumulativeTypes';

const useCumulativeMostActiveIssues = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-most-active-issues`
    const { data, error, isValidating } = useSWR<ICumulativeMostActiveIssues[], any>(repo ? url : null , fetcher);

    return {
        mostActiveIssues: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeMostActiveIssues;