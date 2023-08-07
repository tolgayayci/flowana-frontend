import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICodeFrequency } from '@/types/githubTypes';

const useCodeFrequency = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "lens"

    const url = `/github-project/${protocol}/code-frequency?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<ICodeFrequency, any>(repo ? url : null , fetcher);

    return {
        codeFrequency: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCodeFrequency;