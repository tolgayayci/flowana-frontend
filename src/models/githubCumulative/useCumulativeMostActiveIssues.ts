import useSWRImmutable from 'swr/immutable';import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeMostActiveIssues } from '@/types/githubCumulativeTypes';

const useCumulativeMostActiveIssues = (interval:string = "month") => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/most-active-issues?interval=${interval}`
    const { data, error, isValidating } = useSWRImmutable<ICumulativeMostActiveIssues[], any>(protocol ? url : null , fetcher);

    return {
        mostActiveIssues: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeMostActiveIssues;