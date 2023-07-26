import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersChartData } from '@/types/developersTypes';

const useDevelopersMonthlyCommitsByDevTypeChart = () => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/developers-monthly-commits-by-dev-type-chart`
    const { data, error, isValidating } = useSWR<IDevelopersChartData, any>(protocol ? url : null , fetcher);

    return {
        monthlyCommitsByDevTypeChart: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersMonthlyCommitsByDevTypeChart;