import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IRecentCommits } from '@/types/githubTypes';

const useRecentCommits = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/recent-commits?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<IRecentCommits[], any>(repo ? url : null , fetcher);

    return {
        recentCommits: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRecentCommits;