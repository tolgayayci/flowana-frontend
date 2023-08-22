import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IRecentIssues } from '@/types/githubTypes';

const useRecentIssues = (order_by: string = "created_at") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/recent-issues?owner=${owner}&repo=${repo}&order_by=${order_by}`
    const { data, error, isValidating } = useSWRImmutable<IRecentIssues[]>(protocol ? url : null , fetcher);

    return {
        recentIssues: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentIssues;