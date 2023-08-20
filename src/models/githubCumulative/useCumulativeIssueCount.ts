import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeIssueCount } from '@/types/githubCumulativeTypes';

const useCumulativeIssueCount = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/issue-count`
    const { data, error, isValidating } = useSWR<ICumulativeIssueCount, any>(repo ? url : null , fetcher);

    return {
        issueCount: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeIssueCount;