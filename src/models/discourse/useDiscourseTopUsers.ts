import useSWR from 'swr';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseTopUsers } from '@/types/discourseTypes';

const useDiscourseTopUsers = (interval: string = "all", order: string = "likes_received") => {
    const { protocol } = useProtocol()

    const url = `/discourse/${protocol["protocol"]}/top-users?interval=${interval}&order=${order}`
    const { data, error, isValidating } = useSWR<IDiscourseTopUsers[], any>(protocol ? url : null , fetcher);

    return {
        topUsers: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseTopUsers;