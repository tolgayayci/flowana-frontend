import useSWR from 'swr';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersChartData } from '@/types/developersTypes';

const useDevelopersMonthlyCommitsByDevTypeChart = () => {
    const { protocol } = useProtocol();

    const url = `/developers/${protocol["protocol"]}/monthly-commits-by-dev-type-chart`
    const { data, error, isValidating } = useSWR<IDevelopersChartData, any>(protocol ? url : null , fetcher);

    return {
        monthlyCommitsByDevTypeChart: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersMonthlyCommitsByDevTypeChart;