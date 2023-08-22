import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ICommunityProfile } from '@/types/githubTypes';

const useCommunityProfile = () => {
    const router = useRouter();
    const { owner, repo } = router.query;

    const { protocol } = useProtocol();

    const url = `/github-project/${protocol["protocol"]}/community-profile?owner=${owner}&repo=${repo}`
    const { data, error, isValidating } = useSWRImmutable<ICommunityProfile, any>(protocol ? url : null , fetcher);

    return {
        communityProfile: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useCommunityProfile;