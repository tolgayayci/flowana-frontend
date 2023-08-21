import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeCommitActivity } from '@/types/githubCumulativeTypes';

const useCumulativeCommitActivity = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/commit-activity`
    const { data, error, isValidating } = useSWRImmutable<ICumulativeCommitActivity[], any>(repo ? url : null , fetcher);

    return {
        commitActivity: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeCommitActivity;