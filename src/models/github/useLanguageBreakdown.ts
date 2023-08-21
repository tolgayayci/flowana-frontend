import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ILanguageBreakdown } from '@/types/githubTypes';

const useLanguageBreakdown = () => {
    const router = useRouter();
    const { owner, repo } = router.query;
    
    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/language-breakdown?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<ILanguageBreakdown[], any>(repo ? url : null , fetcher);

    return {
        languageBreakdown: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useLanguageBreakdown;