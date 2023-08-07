import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersChartData } from '@/types/developersTypes';

const useDevelopersMonthlyActiveDevChart = () => {
    const protocol = "compound"

    const url = `/developers/${protocol}/monthly-active-dev-chart`
    const { data, error, isValidating } = useSWR<IDevelopersChartData, any>(protocol ? url : null , fetcher);

    return {
        monthlyActiveDevChart: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersMonthlyActiveDevChart;