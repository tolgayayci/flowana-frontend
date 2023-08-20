import useSWR from 'swr';
import { useProtocol } from '../protocols/useProtocol';
import { fetcher } from '../../utils/fetcher';
import { IProposal } from '@/types/governance';

const useProposals = () => {
    const { protocol } = useProtocol()

    const url = `/governance/${protocol["protocol"]}/proposals`
    const { data, error, isValidating } = useSWR<IProposal[], any>(protocol ? url : null , fetcher);

    return {
        proposals: data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export default useProposals;