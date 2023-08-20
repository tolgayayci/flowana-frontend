import useSWR from 'swr';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDiscourseTag } from '@/types/discourseTypes';

const useDiscourseTags = () => {
    const { protocol } = useProtocol()

    const url = `/discourse/${protocol["protocol"]}/tags`
    const { data, error, isValidating } = useSWR<IDiscourseTag[], any>(protocol ? url : null , fetcher);

    return {
        discourseTags: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDiscourseTags;