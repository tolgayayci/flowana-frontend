import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IContributors } from '@/types/githubTypes';

const useContributors = (protocol: string) => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const url = `/protocols/${protocol}/contributors?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IContributors[]>(repo ? url : null , fetcher);

    return {
        contributors: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useContributors;