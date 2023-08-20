import useSWR from 'swr';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IInfo } from '@/types/governance';
const useInfo = () => {
    const { protocol } = useProtocol()

    const url = `/governance/${protocol["protocol"]}/info`
    const { data, error, isValidating } = useSWR<IInfo, any>(protocol ? url : null , fetcher);

    return {
        info: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useInfo;