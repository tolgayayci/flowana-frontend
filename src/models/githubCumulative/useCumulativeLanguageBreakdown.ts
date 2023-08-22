import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeLanguageBreakdown } from '@/types/githubCumulativeTypes';

const useCumulativeLanguageBreakdown = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-ecosystem/${protocol["protocol"]}/language-breakdown`
    const { data, error, isValidating } = useSWRImmutable<ICumulativeLanguageBreakdown[], any>(protocol ? url : null , fetcher);

    return {
        languageBreakdown: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeLanguageBreakdown;