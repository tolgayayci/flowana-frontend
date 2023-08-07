import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import { ICumulativeLanguageBreakdown } from '@/types/githubCumulativeTypes';

const useCumulativeLanguageBreakdown = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "lens"

    const url = `/github-ecosystem/${protocol}/language-breakdown`
    const { data, error, isValidating } = useSWR<ICumulativeLanguageBreakdown[], any>(repo ? url : null , fetcher);

    return {
        languageBreakdown: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCumulativeLanguageBreakdown;