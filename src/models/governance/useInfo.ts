import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IInfo } from '@/types/governance';
const useInfo = () => {
    const protocol = "compound"

    const url = `/governance/${protocol}/info`
    const { data, error, isValidating } = useSWR<IInfo, any>(protocol ? url : null , fetcher);

    return {
        info: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useInfo;