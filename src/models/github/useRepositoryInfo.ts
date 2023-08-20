import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IRepositoryInfo } from '@/types/githubTypes';

const useRepositoryInfoModel = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/repository-info?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<IRepositoryInfo, any>(repo ? url : null , fetcher);

    console.log("data", data)
    console.log(protocol)

    return {
        repositoryInfo: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useRepositoryInfoModel;