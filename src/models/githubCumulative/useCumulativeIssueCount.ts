import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeIssueCount } from '@/types/githubCumulativeTypes';

const useCumulativeIssueCount = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-issue-count`
    const { data, error, isValidating } = useSWR<ICumulativeIssueCount, any>(repo ? url : null , fetcher);

    return {
        issueCount: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeIssueCount;