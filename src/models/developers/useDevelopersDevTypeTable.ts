import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersDevTypeTable } from '@/types/developersTypes';

const useDevelopersDevTypeTable = () => {
    const protocol = "compound"

    const url = `/developers/${protocol}/dev-type-table`
    const { data, error, isValidating } = useSWR<IDevelopersDevTypeTable, any>(protocol ? url : null , fetcher);

    return {
        devTypeTable: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersDevTypeTable;