import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IIssueCount } from '@/types/githubTypes';

const useIssueCount = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/issue-count?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IIssueCount>(repo ? url : null , fetcher);

    return {
        issueCount: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useIssueCount;