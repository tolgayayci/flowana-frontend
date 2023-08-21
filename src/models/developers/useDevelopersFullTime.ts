import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersCountModel } from '@/types/developersTypes';

const useDevelopersFullTime = () => {
    const { protocol } = useProtocol();

    const url = `/developers/${protocol["protocol"]}/full-time`
    const { data, error, isValidating } = useSWRImmutable<IDevelopersCountModel, any>(protocol ? url : null , fetcher);

    return {
        fullTime: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersFullTime;