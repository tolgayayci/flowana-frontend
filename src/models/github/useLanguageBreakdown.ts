import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

const useLanguageBreakdown = (protocol: string) => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const url = `/protocols/${protocol}/language-breakdown?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR(repo ? url : null , fetcher);

    if(!error && !data) console.log("Loading repository info...");
    if(error) console.log("Error loading repository info: ", error);
    if(data) console.log(data);

    return {
        languageBreakdown: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useLanguageBreakdown;