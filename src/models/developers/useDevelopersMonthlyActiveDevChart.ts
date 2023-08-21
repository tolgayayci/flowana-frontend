import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersChartData } from '@/types/developersTypes';

const useDevelopersMonthlyActiveDevChart = () => {
    const { protocol } = useProtocol();

    const url = `/developers/${protocol["protocol"]}/monthly-active-dev-chart`
    const { data, error, isValidating } = useSWRImmutable<IDevelopersChartData, any>(protocol ? url : null , fetcher);

    return {
        monthlyActiveDevChart: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersMonthlyActiveDevChart;