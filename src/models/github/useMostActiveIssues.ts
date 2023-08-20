import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IMostActiveIssues } from '@/types/githubTypes';

const useMostActiveIssues = (interval: string = "month") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/most-active-issues?owner=${owner}&repo=${repo}&interval=${interval}`
    const { data, error, isValidating } = useSWR<IMostActiveIssues[]>(repo ? url : null , fetcher);

    if(!data) console.log(data);

    return {
        mostActiveIssues: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useMostActiveIssues;