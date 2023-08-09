import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { ILanguageBreakdown } from '@/types/githubTypes';

const useLanguageBreakdown = () => {
    const router = useRouter();
    const { owner, repo } = router.query;
    
    const protocol = "compound"

    const url = `/github-project/${protocol}/language-breakdown?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<ILanguageBreakdown[], any>(repo ? url : null , fetcher);

    return {
        languageBreakdown: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useLanguageBreakdown;