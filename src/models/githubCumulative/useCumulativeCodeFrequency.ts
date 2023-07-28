import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeCodeFrequency } from '@/types/githubCumulativeTypes';

const useCumulativeCodeFrequency = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "polkadot"

    const url = `/protocols/${protocol}/cumulative-code-frequency`
    const { data, error, isValidating } = useSWR<ICumulativeCodeFrequency, any>(repo ? url : null , fetcher);

    return {
        codeFrequency: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeCodeFrequency;