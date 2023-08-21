import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersDevTypeTable } from '@/types/developersTypes';

const useDevelopersDevTypeTable = () => {
    const { protocol } = useProtocol();

    const url = `/developers/${protocol["protocol"]}/dev-type-table`
    const { data, error, isValidating } = useSWRImmutable<IDevelopersDevTypeTable, any>(protocol ? url : null , fetcher);

    return {
        devTypeTable: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersDevTypeTable;