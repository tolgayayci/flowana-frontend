import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';

import { ICommunityProfile } from '@/types/githubTypes';

const useCommunityProfile = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const protocol = "lens"

    const url = `/github-project/${protocol}/community-profile?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWR<ICommunityProfile, any>(repo ? url : null , fetcher);

    return {
        communityProfile: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCommunityProfile;