import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseLatestPosts } from '@/types/discourseTypes';

const useDiscourseLatestPosts = () => {
    const { protocol } = useProtocol()

    const url = `/discourse/${protocol["protocol"]}/latest-posts`
    const { data, error, isValidating } = useSWRImmutable<IDiscourseLatestPosts[], any>(protocol ? url : null , fetcher);

    return {
        latestPosts: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseLatestPosts;