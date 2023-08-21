import useSWRImmutable from 'swr/immutable';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IDevelopersCountModel } from '@/types/developersTypes';

const useDevelopersTotalRepos = () => {
    const { protocol } = useProtocol();

    const url = `/developers/${protocol["protocol"]}/total-repos`
    const { data, error, isValidating } = useSWRImmutable<IDevelopersCountModel, any>(protocol ? url : null , fetcher);

    return {
        totalRepos: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useDevelopersTotalRepos;