import useSWRImmutable from 'swr/immutable';import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeMostActiveIssues } from '@/types/githubCumulativeTypes';

const useCumulativeMostActiveIssues = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/most-active-issues`
    const { data, error, isValidating } = useSWRImmutable<ICumulativeMostActiveIssues[], any>(repo ? url : null , fetcher);

    return {
        mostActiveIssues: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeMostActiveIssues;