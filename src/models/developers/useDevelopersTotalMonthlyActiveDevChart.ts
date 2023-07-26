import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersChartData } from '@/types/developersTypes';

const useDevelopersTotalMonthlyActiveDevChart = () => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/developers-total-monthly-active-dev-chart`
    const { data, error, isValidating } = useSWR<IDevelopersChartData, any>(protocol ? url : null , fetcher);

    return {
        totalMonthlyActiveDevChart: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersTotalMonthlyActiveDevChart;