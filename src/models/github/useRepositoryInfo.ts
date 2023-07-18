import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { IRepositoryInfo } from '@/types/githubTypes';

const useRepositoryInfoModel = (protocol: string) => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const url = `/protocols/${protocol}/repository-info?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IRepositoryInfo, any>(repo ? url : null , fetcher);

    return {
        repositoryInfo: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRepositoryInfoModel;