import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeCodeFrequency } from '@/types/githubCumulativeTypes';

const useCumulativeCodeFrequency = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/code-frequency`
    const { data, error, isValidating } = useSWR<ICumulativeCodeFrequency, any>(repo ? url : null , fetcher);

    return {
        codeFrequency: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeCodeFrequency;