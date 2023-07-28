import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeCommitActivity } from '@/types/githubCumulativeTypes';

const useCumulativeCommitActivity = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-commit-activity`
    const { data, error, isValidating } = useSWR<ICumulativeCommitActivity[], any>(repo ? url : null , fetcher);

    return {
        commitActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeCommitActivity;