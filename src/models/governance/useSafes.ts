import useSWRImmutable from 'swr/immutable';import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { ISafes } from '@/types/governance';

const useSafes = () => {
    const { protocol } = useProtocol()

    const url = `/governance/${protocol["protocol"]}/safes`
    const { data, error, isValidating } = useSWRImmutable<ISafes, any>(protocol ? url : null , fetcher);

    return {
        safes: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useSafes;