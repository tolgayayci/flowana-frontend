import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IVotingPowerChart } from '@/types/governance';

const useVotingPowerChart = (interval: string) => {
    const protocol = "compound"

    const url = `/governance/${protocol}/voting-power-chart?interval=${interval}`
    const { data, error, isValidating } = useSWR<IVotingPowerChart, any>(protocol ? url : null , fetcher);

    return {
        votingPowerChart: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useVotingPowerChart;