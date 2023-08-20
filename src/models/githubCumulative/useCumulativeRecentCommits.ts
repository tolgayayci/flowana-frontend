import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeRecentCommits } from '@/types/githubCumulativeTypes';

const useCumulativeRecentCommits = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/recent-commits`
    const { data, error, isValidating } = useSWR<ICumulativeRecentCommits[], any>(repo ? url : null , fetcher);

    return {
        recentCommits: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeRecentCommits;