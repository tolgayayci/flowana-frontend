import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICommitActivity } from '@/types/githubTypes';

const useCommitActivity = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/commit-activity?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<ICommitActivity[], any>(repo ? url : null , fetcher);

    return {
        commitActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCommitActivity;