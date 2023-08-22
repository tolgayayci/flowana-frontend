import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IIssueActivity } from '@/types/githubTypes';

const useIssueActivity = (interval: string = "month") => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/issue-activity?owner=${owner}&repo=${repo}&interval=${interval}`
    const { data, error, isValidating } = useSWRImmutable<IIssueActivity>(protocol ? url : null , fetcher);

    return {
        issueActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useIssueActivity;