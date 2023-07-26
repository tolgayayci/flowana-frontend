import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersDevTypeTable } from '@/types/developersTypes';

const useDevelopersDevTypeTable = () => {
    const protocol = "polkadot"

    const url = `/protocols/${protocol}/developers-dev-type-table`
    const { data, error, isValidating } = useSWR<IDevelopersDevTypeTable, any>(protocol ? url : null , fetcher);

    return {
        devTypeTable: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersDevTypeTable;