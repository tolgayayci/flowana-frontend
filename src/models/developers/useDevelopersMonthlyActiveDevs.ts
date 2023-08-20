import useSWR from 'swr';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersCountModel } from '@/types/developersTypes';
import { preProcessFile } from 'typescript';

const useDevelopersMonthlyActiveDevs = () => {
    const { protocol } = useProtocol();

    const url = `/developers/${protocol["protocol"]}/monthly-active-devs`
    const { data, error, isValidating } = useSWR<IDevelopersCountModel, any>(protocol ? url : null , fetcher);

    return {
        monthlyActiveDevs: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersMonthlyActiveDevs;