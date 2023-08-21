import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IIssueCount } from '@/types/githubTypes';

const useIssueCount = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/issue-count?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IIssueCount>(repo ? url : null , fetcher);

    return {
        issueCount: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useIssueCount;