import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersChartData } from '@/types/developersTypes';

const useDevelopersMonthlyCommitsChart = () => {
    const protocol = "compound"

    const url = `/developers/${protocol}/monthly-commits-chart`
    const { data, error, isValidating } = useSWR<IDevelopersChartData, any>(protocol ? url : null , fetcher);

    return {
        monthlyCommitsChart: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersMonthlyCommitsChart;