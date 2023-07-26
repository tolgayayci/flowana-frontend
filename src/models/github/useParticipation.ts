import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IParticipation } from '@/types/githubTypes';

const useParticipation = (protocol: string) => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const url = `/protocols/${protocol}/participation?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IParticipation>(repo ? url : null , fetcher);

    return {
        participation: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useParticipation;