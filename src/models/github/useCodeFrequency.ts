import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICodeFrequency } from '@/types/githubTypes';

const useCodeFrequency = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/code-frequency?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<ICodeFrequency, any>(repo ? url : null , fetcher);

    return {
        codeFrequency: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCodeFrequency;